export const errorRes = ({ msg = "ERROR", statusCode = 500, }) => {

    throw new Error(msg, {
        cause: {
            statusCode
        }
    })


}