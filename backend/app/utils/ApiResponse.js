
class ApiResponse{
    constructor(){
        this.sucess = true
        this.message = ''
        this.data = {}
    }

    setSuccess(message=''){
        this.message = message
        this.sucess = true
        return this
    } 

    setError(message=''){
        this.message = message
        this.sucess = false
        return this
    }

    setData(field, data){
        this.data[field] = data
        return this
    }

    setMultiData(fields, datas){
        for (let i = 0; i < fields.length; i++){
            this.data[fields[i]] = datas[i]
        }
        return this
    }
}

module.exports = ApiResponse