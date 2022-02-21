const _ = require('lodash');
const articleCalc = (article_type, sqm, factor1, factor2, article_cost, material_cost, labour_cost) => {
    let article_sqm = sqm * factor1;
    let other_sqm = sqm * factor2;

    let sum_article_cost = article_sqm * article_cost;

    let sum_material_cost = other_sqm * material_cost;

    let sum_labour_cost = other_sqm * labour_cost;

    let total = sum_article_cost + sum_labour_cost + sum_material_cost;

    let newArticle = {
      article_type,
      article_cost,
      article_sqm,
      article_type,
      other_sqm,
      labour: Number(_.round(sum_labour_cost, 2).toFixed(2)),
      article_price: Number(_.round(sum_article_cost, 2).toFixed(2)),
      labour_cost,
      material_cost,
      material: Number(_.round(sum_material_cost, 2).toFixed(2)),
      total: Number(_.round(total, 2).toFixed(2))
    };

    return newArticle;
};

module.exports = exports = { articleCalc };

