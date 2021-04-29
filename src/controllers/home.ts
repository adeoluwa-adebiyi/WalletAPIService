import AuthService from "../services/auth-service-impl";
import { Request, Response } from "express";

const login = async(req: Request, res: Response, next: Function) => {
    try{
        const { email, password } = req.body;
        const response = await AuthService.login(email, password);
        res.send({...response});
    }catch(e){
        res.status(401).send({
            status: "failure",
            message: e.message
        });
    }
}

const register = async(req: Request, res: Response, next: Function) => {
    try{
        const { email, password, firstname, lastname } = req.body;
        const response = await AuthService.registerUser(email, password, firstname, lastname);
        res.send({
            status:"success",
            message: "User registered successfully"
        });
    }catch(e){
        res.status(500).send({
            status: "failure",
            message: e.message
        });
    }
}

export default {
    login,
    register
}