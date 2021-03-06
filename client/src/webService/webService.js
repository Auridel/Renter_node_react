import CustomError from "../errors/customError";

export default class WebService {
    async _getResource(url, opt){
        const res = await fetch(`http://localhost:4000${url}`, opt);
        if(!res.ok) {
            const serverMessage = await res.json();
            throw new CustomError(res.status, serverMessage.message)
        }

        return res.json();
    }

    async login(body) {
        return await this._getResource("/api/auth/login", {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body
        });
    }

    async register(body){
        return await this._getResource("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body
        });
    }

    async getEntries(body){
        return await this._getResource("/api/account/get", {
            method: "GET",
            headers: {
                "authorization": `Bearer ${body}`
            }
        })
    }

    async updateEntries(body, token){
        return await this._getResource("/api/account/add", {
            method: "POST",
            headers: {
                "authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body
        })
    }

    async deleteData(body, token){
        return await this._getResource("/api/account/del", {
            method: "POST",
            headers: {
                "authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: body
        })
    }

    async updateName(body, token){
        return await this._getResource("/api/auth/name", {
            method: "POST",
            headers: {
                "authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: body
        })
    }
};