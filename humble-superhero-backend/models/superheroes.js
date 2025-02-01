let superHeroes=[];
const heroesProperties = ['id', 'name', 'superpower', 'humility_score'];

exports.addSuperHero=(newHero)=>{
    return new Promise((resolve, reject) => {
        if(Object.keys(newHero).every(key => heroesProperties.includes(key))){
            if(newHero.humility_score>=1 && newHero.humility_score<=10){
                superHeroes.push(newHero);            
               resolve(true);
            }else{
               reject("Humility score must be number between 1 and 10");
            }        
        }else{
            reject("Wrong keys for hero object");
        }
    }) 

}


exports.getSuperHeroes=()=>{
    return superHeroes.sort((a, b) => a.humility_score - b.humility_score);;
}


