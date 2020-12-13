// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (num, dnaStrand) => {
  return {
    specimenNum: num,
    dna: dnaStrand,
    compareDNA(pAequor) {
      let newSpecimenDNA = pAequor.dna;
      let matchingDNA = this.dna.map( base => { //new array that contains bases in exact position matching (or not) for given specimen
        return base === newSpecimenDNA[this.dna.indexOf(base)];
      });
      let baseMatches = matchingDNA.filter( ele => {  
        return ele;
      });
      console.log(`Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${(baseMatches.length / matchingDNA.length).toFixed(2) * 100}% DNA in common`)
    },
    mutate() {
      let randBaseIndex = Math.floor(Math.random() * this.dna.length);  //pick random base (index) to mutate
      let currentBase = this.dna[randBaseIndex];  //store current base for chosen index
      let newBase = '';
      do {
        newBase = returnRandBase();  //loop random new base until it doesn't match original
      } while (newBase === currentBase);
      this.dna[randBaseIndex] = newBase;  //assign new base to original base index
    },
    willLikelySurvive() {
      let baseMatches = this.dna.filter( base => {  //new array of bases matching 'C' and 'G'
        return base === 'C' || base === 'G';
      })
      return (baseMatches.length / this.dna.length).toFixed(2) >= 0.6;  //true if num. of 'C' and 'G' bases >= 60%
    },
    complementStrand() {
      //Returns the complementary DNA strand.
      const complementBases = { //object storing base-binding that can be referred later
        A: "T",
        C: "G",
        G: "C",
        T: "A"
      };
      const newDNA = this.dna.map( base => {
        return complementBases[base];  //get base-pairing
      })
      return newDNA;
    }
  }
}

let arrayOrgCanSurvive = [];
let count = 0;
let iter = 0; //Track num. of iterations in finding 30 surviable organisms
while (count < 30) {
  let newpAequor = pAequorFactory(count + 1, mockUpStrand()); //new pAequor object
  if(newpAequor.willLikelySurvive()) {
    arrayOrgCanSurvive.push(newpAequor);
    count++;
  }
  iter++;
}
//Verify 30 instances of pAequor added
console.log('Went through ' + iter + ' iterations to get ' + arrayOrgCanSurvive.length + ' pAequor that can survive in their natural environment');


//Testing...
const newOrg = pAequorFactory(1, mockUpStrand());  //test object instantiation
console.log(newOrg.dna);
console.log('Complement is ' + newOrg.complementStrand());  //test complementStrand() method
newOrg.mutate();
console.log(newOrg.dna);  //test mutate() method
const newOrg2 = pAequorFactory(2, mockUpStrand());
console.log(newOrg2.dna);
newOrg.compareDNA(newOrg2);  //test compareDNA method





