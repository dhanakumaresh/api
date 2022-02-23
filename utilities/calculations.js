const _ = require('lodash');

const articleCalc = (article_type, sqm, factor1, factor2, article_cost, material_cost, labour_cost) => {

  let total, article_sqm, other_sqm;
  let sum_article_cost, sum_material_cost, sum_labour_cost;

    if (article_type === 'heizung') {
      article_sqm = sqm;
      other_sqm = sqm;
  
      sum_article_cost = article_cost;
  
      sum_material_cost = material_cost;
  
      sum_labour_cost = labour_cost;

      total = sum_article_cost + sum_labour_cost + sum_material_cost;

      total = article_cost + labour_cost + material_cost;
    } else {
      article_sqm = sqm * factor1;
      other_sqm = sqm * factor2;
  
      sum_article_cost = article_sqm * article_cost;
  
      sum_material_cost = other_sqm * material_cost;
  
      sum_labour_cost = other_sqm * labour_cost;
      total = sum_article_cost + sum_labour_cost + sum_material_cost;
    };
 
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

const taxCalculation = (articlesobj) => {

  let mwst = Number(_.round((articlesobj.total * 0.19), 2).toFixed(2))
  let brutto = Number(_.round((articlesobj.total * 1.19), 2).toFixed(2))

  let article_t = {"mwst":mwst, "brutto":brutto}

  return article_t;

}

module.exports = exports = { articleCalc, taxCalculation };

