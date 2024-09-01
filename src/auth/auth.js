const jsonwebtoken = require("jsonwebtoken");
const privateKey = require("../auth/privateKey");

module.exports = auth = (req, res, next) => {
  const authorizationHeaders = req.headers.authorization;

  if (!authorizationHeaders) {
    const message = "vous avez pas fourni de jeton d'authentification";
    return res.status(401).json({ message });
  }

  const token = authorizationHeaders.split(" ")[1];
  const decodeToken = jsonwebtoken.verify(
    token,
    privateKey,
    (error, decodeToken) => {
      if (error) {
        const message = "vous avez pas fourni de jeton d'authentification";
        return res.json({ message });
      }
      userId = decodeToken.userId;
      if (req.body.userId && req.body.userId !== userId) {
        const message = "vous n'etes pas autorise a acceder a cette ressource";
        return res.status(401).json({ message });
      } else {
        next();
      }
    }
  );
};
