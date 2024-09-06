const jsonwebtoken = require("jsonwebtoken");
const privateKey = require("../auth/privateKey");

module.exports = auth = (req, res, next) => {
  const authorizationHeaders = req.headers.authorization;

  if (!authorizationHeaders) {
    const message =
      "Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.";
    res.status(401).json({ message });
  }

  const token = authorizationHeaders.split(" ")[1];
  const decodeToken = jsonwebtoken.verify(
    token,
    privateKey,
    (error, decodeToken) => {
      if (error) {
        const message =
          "L'utilisateur n'est pas autorisé à accèder à cette ressource";
        return res.status(401).json({ message, data: error });
      }
      const userId = decodeToken.userId;
      if (req.body.userId && req.body.userId !== userId) {
        const message = `L'identifiant de l'utilisateur est invalide.`;
        res.status(401).json({ message });
      } else {
        next();
      }
    }
  );
};
