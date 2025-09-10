const prisma = require('../prisma/client');
async function generateGhostId(){
  for(let i=0;i<10;i++){
    const n = Math.floor(Math.random()*900000)+1;
    const ghost = `Ghost${n}`;
    const exists = await prisma.user.findUnique({ where: { ghost_id: ghost }});
    if(!exists) return ghost;
  }
  return `Ghost${Date.now()}`;
}
module.exports = generateGhostId;
