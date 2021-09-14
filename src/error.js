const Err = (code, message) => {
    const err = new Error(message)
    err.code = code
    return err
}
Err.prototype = Object.create(Error.prototype);
export default Err