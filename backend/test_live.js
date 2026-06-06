async function test() {
  try {
    const res1 = await fetch('https://cs-studio.in/api/health');
    console.log('cs-studio.in/api/health:', res1.status);
  } catch(e) {}
  
  try {
    const res2 = await fetch('https://api.cs-studio.in/api/health');
    console.log('api.cs-studio.in/api/health:', res2.status);
  } catch(e) {}
  
  try {
    const res3 = await fetch('https://cs-studio-backend.onrender.com/api/health');
    console.log('render/api/health:', res3.status);
  } catch(e) {}
}
test();
