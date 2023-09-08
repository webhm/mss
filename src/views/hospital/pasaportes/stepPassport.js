import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import ApiHTTP from "../../../models/ApiHTTP";
import HeaderPublic from "../../layout/headerPublic";

// StepPassport MV

class StepPassport extends App {
    pasaportes = null;
    dataPasaporte = null;
    idPasaporte = null;
    idFiltro = 1;
    constructor(_data) {
        super();
    }
    oncreate(_data) {

        if (_data.attrs !== undefined) {
            this.dataPasaporte = _data.attrs;
            this.idPasaporte = this.dataPasaporte.NHC;
            this.fetchPasaporte();
        }
    }

    fetchPasaporte() {

        let _this = this;

        return m.request({
            method: "POST",
            url: ApiHTTP.apiUrl + "/v2/pacientes/step-pasaporte",
            body: _this.dataPasaporte,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Authorization': localStorage.getItem('userToken')
            },
        })
            .then(function (result) {
                if (result.status) {
                    m.route.set('/hospitalizacion/pasaporte', {
                        idPasaporte: _this.idPasaporte
                    })
                } else {
                    alert(result.message)
                }
            })
            .catch(function (e) {
                return {
                    'status': null,
                    'message': e
                };
            });

    }


}


function queryStringToJSON(queryString) {
    if (queryString.indexOf('?') > -1) {
        queryString = queryString.split('?')[1];
    }
    var pairs = queryString.split('&');
    var result = {};
    pairs.forEach(function (pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });
    return result;
}

export default StepPassport;