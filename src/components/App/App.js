import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { PAGES } from '../../utils/consts';

import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';

import './app.css';

let testCounter = 0;

function App() {

  const testMovies = [
    { nameRU: "В погоне за Бенкси", duration: "0ч 42м", saved: true, image: "https://s3-alpha-sig.figma.com/img/71a2/3794/3bfd6b9af4141d2ee15e36a186b073a7?Expires=1693180800&Signature=FP6-p8BKPDvtxr7qJAUaqOfilbxh6~XE0NGfoztH0wFJawCQyZy3UA9JbjWyNrmP5Ec0FvfAG492s-2~8SZ95MRVWTWVBIqQO97OBuG-K4zq11k6RzgS8gv2w5MyNmSMUQrCafrFs0AjMLfEMKcm65swoBpptv~LCO2nhQfsQmzsdyGtEL9Dhs2VOFCCWIPoMdvZ4LoQCCc~iB1wl6WEZd6dnTM6Y-7W1WK5WODEd9k9HCnyTHCNFxj5h0o~G4UnNYUUNFrzN9jkA4wWyf-SzVMx9jJktt2Z6RcX4F88aI89d7ML8BHPxq9WvsbavtAuoJmUjaTzDopJUCqRageH9A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" },
    { nameRU: "В погоне за Бенкси", duration: "0ч 42м", image: "https://s3-alpha-sig.figma.com/img/90ba/2e4b/e072f3f38937c7f5d592d64f3fa59f33?Expires=1693180800&Signature=RtM3kwOOMvgczadvtpVlsnh1x~kbpaZGOxz-~4iPaPXODnqXxfaixGi9O143srsHGdv7KXjHGxKJAzaRAYg-TXqZlazxGHZCBHaFCokEllXcdgmj91OBQ1-8hMzOc0I7wsdFN00WzsHXoJqlX43LZrW62CFW2GWWwhnNSk1y-BHGeoVkWE3IVPSVCoKjDi~Uy6ByxiN3FUH-z3TXnwmMwqGHWm7P-t-1eoCjLjUUOU8J-qUP3tCg5a2zTy0hXdwKoLMUPGZJ4WF-zfjllm7gXbbj387Q2gcspnUGYhqLlUXuG685B2b3Y5PRP9l-GTq0ogDkuv3FS9nS52RodwBSWg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" },
    { nameRU: "В погоне за Бенкси", duration: "0ч 42м", image: "https://s3-alpha-sig.figma.com/img/7501/fcae/58fcf299e5a04c29cb37e6280c83da16?Expires=1693180800&Signature=TeIw57Q1-yoJmUL78rRinNXKo5UdjFW-mjQYt~SlMNVnauxBngllvNpvbjeBT5BsQG55QkN2t~bTNMA0ATbnRtqnyCB~Zuns13SHK0VtRSPzgmIGmcYHsSIgMRajT45jFE2wofI~0TUH7lw1zdbjFJurj7UcohfPEgIO8t4I7ezSMX5AD2qO-vBEtjlCQS0Ue1GCWbPztbiIXaoVI3uSiE~pF2DsLeBG1OxHjqicjWy7Zb6IVrk7kIxt2mtKuE1wrw1IdJ3aIprgiiScrNE5dN71GQlB3AKMKPQm121I0PyQfrLb4x0EnSYTS~EiH2naZDiC8RGGqDzki31rWxJ1RQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" },
    { nameRU: "В погоне за Бенкси", duration: "0ч 42м", saved: true, image: "https://s3-alpha-sig.figma.com/img/96cc/9d30/2e6653f8a2dbac83b4795cc1e846a243?Expires=1693180800&Signature=bsIT7VSAu9F052Gxuk~KC7cjYF6k0dQx7H5JWfJMjp1rChV~c2mllkChgMAcn-uq3YWBStjMclo0uBdq43Ij6m~U5nbZKTllQ7gr--icKiO3MG3MKXAPhEMqGdN1FUQKoCWLPtTHL2cOmzgLrZNPukKKSpO2g0uNJeHPuzXDVLSiTiqh1r7wir3n3tWjzRbYq8J1QFsX~yGvhxZCU7gGgyru~z0wB-W62AQxMpjfofpoQes0folPOFt0eHDnVmj06opGLI~6O8TQDJOo5VyJWKoNsOjrVLsAsSprSWtviEO7dshE-EosrhEbYpQbsze7cq0UFDaYsrPUwPLZLonmlw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" },
    { nameRU: "В погоне за Бенкси", duration: "0ч 42м", image: "https://s3-alpha-sig.figma.com/img/b5e4/a6cb/ff07e856bc14f2c67fd3d453609875e8?Expires=1693180800&Signature=GkEhHyyAf8fsCbMUNgxuLrwa6CpMv7NUXhUZ7RIglwboyS~oCpMNtlWSNtsT8wAPnVNILinVZpprsvtZd0BzvQlBs9fmYdGDekbUUQegTOCmUFNhLAlvq5FO1tM08eP4vZWwxzv426DrA7ot5DyJ6PCUsf~kg5x97lGBlx3paN9vSAGrlfQvna0qgpV7SS5UULBUuoF~pyosKL9XWMucmWKXSFiuZ-Iw2Mlf6MGwgetqp57pjDemn2lh~28bmpQRqdDwe~9mz-kDH~hK8vADEtABGNWJFCp5sfJAirK-9QwfrMTtKhs-cezrBkYLUvTYY7OlPM6jw4I72sRJEQdF9w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" },
    // { nameRU: "В погоне за Бенкси", duration: "0ч 42м", image: "" },
  ];

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);

  const handleSearchAll = ({ searchString, onlyShortFilms }) => {

    return new Promise((resolve, reject) => {

      // TODO: Здесь будет обращение к API за поиском
      console.log(`Running search... ${searchString}, onlyShortFilms:${onlyShortFilms}`);

      setTimeout(() => {
        setFilteredMovies(testMovies);
        resolve(); // эмулируем загрузку
      }, 5000);
    });

  }

  const handleSearchLiked = ({ searchString, onlyShortFilms }) => {

    return new Promise((resolve, reject) => {

      // TODO: Здесь будет фильтрация
      console.log(`Running search liked... ${searchString}, onlyShortFilms:${onlyShortFilms}`);

      setTimeout(() => {
        setLikedMovies(testMovies);
        resolve();
      }, 3000); // эмулируем загрузку
    });

  }

  const saveProfile = (newValues) => {

    return new Promise((resolve, reject) => {

      // TODO: Здесь будет обращение к API за сохранением профиля
      console.log(`Running save profile... ${newValues}`);

      setTimeout(() => {

        if (++testCounter % 3 === 0) {
          resolve();
        } else {
          reject("При обновлении профиля произошла ошибка.");
        }

      }, 5000);
    });

  }


  return (
    <Routes>
      <Route path={PAGES.MAIN} element={<Main />} />
      <Route path={PAGES.REGISTER} element={<Register />} />
      <Route path={PAGES.LOGIN} element={<Login />} />
      <Route path={PAGES.NOT_FOUNT} element={<NotFound />} />
      <Route path={PAGES.PROFILE} element={<Profile handleSave={saveProfile} />} />
      <Route path={PAGES.MOVIES} element={<Movies movies={filteredMovies} handleSearch={handleSearchAll} />} />
      <Route path={PAGES.SAVED_MOVIES} element={<Movies movies={likedMovies} handleSearch={handleSearchLiked} likedMovies={true} />} />
      <Route path="/" element={<Navigate to={PAGES.MAIN} replace />} />
      <Route path="*" element={<Navigate to={PAGES.NOT_FOUNT} replace />} />
    </Routes>
  );
}

export default App;
