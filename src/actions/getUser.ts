import {auth} from "@/auth/auth"

export default async function getUser(){
    try{
        const session = await auth()
        return session?.user ? session.user:null
    } catch{
        return null
    }
}