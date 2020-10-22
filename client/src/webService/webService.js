export default class WebService {
    async _getResource(url, opt){
        const res = await fetch(`http://localhost:4000${url}`, opt);
        if(!res.ok) throw new Error(res.status);

        return res.json();
    }

    async login(body) {
        return await this._getResource("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body
        });
    }

    async register(body){
        return await this._getResource("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body
        });
    }
};