const sqm = 4
const article = 200
const material = 100
const labour = 50

export default calc = (sqm,article,material,labour) => {
    let article_sqm = sqm * 2.97
    let other_sqm = sqm * 2.7

    let article_cost = article * 0.155
    let sum_article_cost = article_sqm * article_cost
        
    let material_cost = material *  0.038
    let sum_material_cost = other_sqm * material_cost

    let labour_cost = labour * 0.093
    let sum_labour_cost = other_sqm * labour_cost
    
    let total = sum_article_cost + sum_labour_cost + sum_material_cost

    return total;
}

const elektro = (sqm,article,material,labour,costs) => {
    // let costs = {
    //     area: 0.500,
    //     costPerArticle: 0.454,
    //     costPerMaterial: 0.536,
    //     costPerLabour: 0.820
    // }; 
    let { costPerSqm, costPerArticle, costPerMaterial, costPerLabour } = costs;

    let article_sqm = sqm * area
    let other_sqm = sqm * area;

    let article_cost = article * 0.454
    let sum_article_cost = article_sqm * article_cost
    
    let material_cost = material *   0.536
    let sum_material_cost = other_sqm * material_cost

    let labour_cost = labour * 0.820
    let sum_labour_cost = other_sqm * labour_cost

    let total = sum_article_cost + sum_labour_cost + sum_material_cost;

    return total;
}


const elektro = (sqm,article,material,labour) => {
    let article_sqm = sqm * 0.530
    let other_sqm = sqm * 0.530

    let article_cost = article * 0.066
    let sum_article_cost = article_sqm * article_cost
        
    let material_cost = material *   0.917
    let sum_material_cost = other_sqm * material_cost

    let labour_cost = labour * 0.251
    let sum_labour_cost = other_sqm * labour_cost

    let total = sum_article_cost + sum_labour_cost + sum_material_cost

    return total;
};

const maler = (sqm,article,material,labour) => {
    let article_sqm = sqm * 3.16
    let other_sqm = sqm * 3.16

    let article_cost = article * 0.022
    let sum_article_cost = article_sqm * article_cost
        
    let material_cost = material *   0.045
    let sum_material_cost = other_sqm * material_cost

    let labour_cost = labour * 0.024
    let sum_labour_cost = other_sqm * labour_cost

    let total = sum_article_cost + sum_labour_cost + sum_material_cost

    return total;
}

const Demontage = (sqm,article,material,labour) => {


        let article_sqm = sqm * 1
        let other_sqm = sqm * 1

        let article_cost = article * 0
        let sum_article_cost = article_sqm * article_cost
        
        let material_cost = material *   0
        let sum_material_cost = other_sqm * material_cost

        let labour_cost = labour * 0.032
        let sum_labour_cost = other_sqm * labour_cost

        let total = sum_article_cost + sum_labour_cost + sum_material_cost
        return total;

}

const Sonstiges = (sqm,article,material,labour) => {

        let article_sqm = sqm * 0.700
        let other_sqm = sqm * 0.700

        let article_cost = article * 0
        let sum_article_cost = article_sqm * article_cost
        
        let material_cost = material *   0
        let sum_material_cost = other_sqm * material_cost

        let labour_cost = labour * 0.139
        let sum_labour_cost = other_sqm * labour_cost

        let total = sum_article_cost + sum_labour_cost + sum_material_cost
        return total;

}