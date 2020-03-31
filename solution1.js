const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises',{ useNewUrlParser: true,useUnifiedTopology: true });


const courseSchema = new mongoose.Schema({
  name: String,
  author: String, 
  tags: [ String ],
  date: Date, 
  isPublished: Boolean,
  price: Number
});
const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course= new Course({
        name:'Node.js',
        author:'Khalid2',
        tags:['php','backend'],
        isPublished:true,
        price:10
    })
    const result=await course.save();
    console.log('result check',result) 
}
createCourse()


async function getCourses() {
  return await Course
  .find({ isPublished: true, tags: 'backend' })
  .sort({ name: 1 })
  .select({ name: 1, author: 1 });
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

// run();
