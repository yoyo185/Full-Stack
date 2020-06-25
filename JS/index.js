class Holiday{
    constructor(destination,days){
        this.destination = destination;
        this.days = days
    }
    info(){
        console.log(`${this.destination} will take ${this.days} days.`);
    }
}

const trip = new Holiday('Kathmandu, Nepal',30);
console.log(trip.info());
//sub class
class Expedition extends Holiday{
    constructor(destination,days,gear){
        super(destination,days);
        this.gear = gear;
    }
    info(){
        super.info();
        console.log(`Bring you ${this.gear.join(" and your ")}`);
    }
}
const tripWithGear = new Expedition("Everest",30,["Sunglasses","Flags","Camera"]);
tripWithGear.info();




// var advantrureClimbing = {
//     name : 'Everest',
//     height: 8848,
//     output (){
//         console.log(`Mt. ${this.name} is ${this.height} meter tall`);
//     }
// };
// advantrureClimbing.output();

// let uniStudent = student =>{
//     let {name,university} = student;
//     console.log(`${name} from ${university}`);
// }

// uniStudent({
//     name:'Ryan',
//     university:'University of Sydney'
// });

// let thingsToDo ={
//     morning:'Exercise',
//     afternoon:'Work',
//     evening:'Code',
//     night:['Sleep','Dream']
// };

// let {morning,afternoon} = thingsToDo;
// morning = 'run';
// console.log(morning,'-',afternoon);


// function gretting(message){
//     return alert(`${message} everyone!`);
// }

// let gretting=(message)=>alert(`${message} everyone`);
// gretting('Good morning');

// let createBlog = (title,body)=>{
//     if (!title){
//         throw new Error('A title is require');
//     }
//     if (!body){
//         throw new Error('Body can not be Empty');
//     }
//     return alert(`${title}-${body}`);
// }
// createBlog();

// let nepal = {
//     //add property
//     mountains:['Everest','Fish Tail','Annapurna'],
//     //add method
//     printWithDash:function(){
//         setTimeout(()=>console.log(this.mountains.join("-")),3000);
//     }
// };
// nepal.printWithDash();
