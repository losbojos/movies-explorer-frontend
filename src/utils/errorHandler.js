const errorHandler = (error, afterClose = null) => {
    console.log(error);

    //alert(error);
    // TODO?
    // handleInfoTooltip(error, errorIcon, afterClose);
}

export { errorHandler }
