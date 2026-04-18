import docker from "dockerode"

const a = new docker()

a.getContainer("aa").remove().catch((err) =>{
  if (err.statusCode === 404) { console.log("Ola") }
})