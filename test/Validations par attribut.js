sequelize.define('foo', {
    bar: {
      type: DataTypes.STRING,
      validate: {
        is: /^[a-z]+$/i,          // correspond à cette expression régulière
        is: ["^[a-z]+$",'i'],     // idem que ci-dessus, mais en construisant l'expression régulière à partir d'une chaîne
        not: /^[a-z]+$/i,         // ne correspond pas à cette expression régulière
        not: ["^[a-z]+$",'i'],    // idem que ci-dessus, mais en construisant l'expression régulière à partir d'une chaîne
        isEmail: true,            // vérifie le format d'un email (foo@bar.com)
        isUrl: true,              // vérifie le format d'une URL (https://foo.com)
        isIP: true,               // vérifie le format IPv4 (129.89.23.1) ou IPv6
        isIPv4: true,             // vérifie le format IPv4 (129.89.23.1)
        isIPv6: true,             // vérifie le format IPv6
        isAlpha: true,            // n'autorise que les lettres
        isAlphanumeric: true,     // n'autorise que les caractères alphanumériques, donc "_abc" échouera
        isNumeric: true,          // n'autorise que les nombres
        isInt: true,              // vérifie si c'est un entier valide
        isFloat: true,            // vérifie si c'est un nombre à virgule flottante valide
        isDecimal: true,          // vérifie si c'est un nombre
        isLowercase: true,        // vérifie si c'est en minuscules
        isUppercase: true,        // vérifie si c'est en majuscules
        notNull: true,            // n'autorise pas les valeurs nulles
        isNull: true,             // n'autorise que les valeurs nulles
        notEmpty: true,           // n'autorise pas les chaînes vides
        equals: 'specific value', // n'autorise qu'une valeur spécifique
        contains: 'foo',          // force la présence de sous-chaînes spécifiques
        notIn: [['foo', 'bar']],  // vérifie que la valeur ne fait pas partie de ces éléments
        isIn: [['foo', 'bar']],   // vérifie que la valeur fait partie de ces éléments
        notContains: 'bar',       // n'autorise pas certaines sous-chaînes spécifiques
        len: [2,10],              // n'autorise que les valeurs de longueur comprise entre 2 et 10
        isUUID: 4,                // n'autorise que les UUID
        isDate: true,             // n'autorise que les chaînes de caractères représentant des dates
        isAfter: "2011-11-05",    // n'autorise que les dates postérieures à une date spécifique
        isBefore: "2011-11-05",   // n'autorise que les dates antérieures à une date spécifique
        max: 23,                  // n'autorise que les valeurs <= 23
        min: 23,                  // n'autorise que les valeurs >= 23
        isCreditCard: true,       // vérifie si c'est un numéro de carte de crédit valide
  
        // Exemples de validateurs personnalisés :
        isEven(value) {
          if (parseInt(value) % 2 !== 0) {
            throw new Error('Seules les valeurs paires sont autorisées!');
          }
        }
        isGreaterThanOtherField(value) {
          if (parseInt(value) <= parseInt(this.otherField)) {
            throw new Error('Bar doit être supérieur à otherField.');
          }
        }
      }
    }
  });
  