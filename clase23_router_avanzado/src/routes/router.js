import { Router } from "express";
import jwt from 'jsonwebtoken'

export default class R2_Router {
    constructor() {
        this.router = Router()
        this.init()
    }

    init(){}

    getRouter() {
        return this.router
    }

    //get('/path', 123, 123, 123, 123, 123123) 
    // path='/path'    callbacks = [123, 123, 123, 123]
    get(path, policies, ...callbacks) {
        this.router.get(path, this.generateCustomResponses, this.handlePolicies(policies), this.applyCallbacks(callbacks))
    }

    post(path, policies, ...callbacks) {
        this.router.post(path, this.generateCustomResponses, this.handlePolicies(policies), this.applyCallbacks(callbacks))
    }

    put(path, policies, ...callbacks) {
        this.router.put(path, this.generateCustomResponses, this.handlePolicies(policies), this.applyCallbacks(callbacks))
    }

    delete(path, policies, ...callbacks) {
        this.router.delete(path, this.generateCustomResponses, this.handlePolicies(policies), this.applyCallbacks(callbacks))
    }

    applyCallbacks(callbacks) {
        return callbacks.map(callback => async(...params) => {
            try {
                //params (req, res, next)
                // apply apunta directametne a la funcion callbacl
                // this es para que se utilize el contexto de la clase Router

                await callback.apply(this, params)
            } catch (error) {
                console.log(error)
                params[1].status(500).send(error)
            }
        })
    }

    generateCustomResponses = (req, res, next) => {
        res.sendSuccess = payload => res.json({status: 'success', payload })
        res.sendServerError = error => res.status(500).json({status: 'error', error })
        res.sendUserError = error => res.status(400).json({status: 'error', error})
        res.sendNoAuthenticadError = error => res.status(401).json({status: 'error', error})
        res.sendNoAuthorizadError = error => res.status(403).json({status: 'error', error})

        next()
    }

    handlePolicies = policies => (req, res, next) => {
        if(policies.includes('PUBLIC')) return next()

        if(policies.length > 0) {
            const token = req.headers.auth

            if(!token) return res.sendNoAuthenticadError('No authenticado')

            const user = jwt.verify(token, 'secret')

            if(!policies.includes(user.role.toUpperCase())) {
                return res.sendNoAuthorizadError('No estas autorizado')
            }

            req.user = user
            return next()
        }

        return res.sendNoAuthenticadError('This is private ⚠⚠⚠')
    }


}