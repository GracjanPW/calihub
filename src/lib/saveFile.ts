import path from "path"
import fs from "fs"
import { randomInt } from "crypto"

export default function saveFile(file:File): Promise<Partial<{url:string, error:string}>>{
    return new Promise(async (resolve,reject)=>{
        try {
            const buffer = Buffer.from(await file.arrayBuffer())
            let name = file.name
            if (!fs.existsSync(path.join(process.cwd(), "public/assets"))){
                fs.mkdirSync(path.join(process.cwd(), "public/assets"))
            }
            while (fs.existsSync(path.join(process.cwd(), "public/assets/"+name  ))){
                name =  randomInt(0,10).toString()+name 
            }
            let url = path.join("public/assets/",name)
            await fs.promises.writeFile(path.join(process.cwd(), url),new Uint8Array(buffer)).then((value)=>{
                console.log("val ", value)

            }, (reason)=>{
                console.log(reason)
                reject({error:reason})
            }).catch((error)=>{
                console.log({error})
                reject(error)
            }).finally(()=>{
                resolve({url})
            })
        } catch (error) {
            console.log(error)
            reject({error})
        }
    })
}