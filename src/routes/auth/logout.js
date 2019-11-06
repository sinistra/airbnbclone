export const post = async (req, res, next) => {
    req.logout();
    req.session.destroy();
    return res.end(JSON.stringify({status: 'success', message: 'Logged out'}))
};
