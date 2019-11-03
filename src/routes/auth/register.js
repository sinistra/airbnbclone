export const post = (req, res) => {
    res.end('POST request received correctly')
    console.log(req.body)
}
