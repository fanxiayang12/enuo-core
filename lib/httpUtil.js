var request = require("request");
var logger = require('./logger');
var urlencode = require('urlencode');
const FormData = require('form-data');
const form = new FormData();
var fs = require("fs");
var httpUtil = {



    postUrl: async function (url, data, ticket, timeout) {
        var headers = {
            "content-type": "application/x-www-form-urlencoded",
        };
        if (ticket != null) {
            headers.ticket = ticket;
        }
        return new Promise(function (resolve, reject) {
            request({
                url: url,
                timeout: timeout | 1000,
                method: "POST",
                json: true,
                headers: headers,
                form: data
            }, function (error, response, data) {
                if (error) {
                    reject(error);
                    return;
                }

                if (response.statusCode == 200) {
                    resolve(data);
                } else {
                    logger.error("response.statusCode...", response.statusCode);
                    logger.error("data", data);
                    reject(new Error("post server error", {
                        url: url,
                        data: data,
                        ticket: ticket,
                        code: response.statusCode
                    }));
                }
            });
        })
    },
    deleteUrl: async function (url, data, ticket) {
        var headers = {
            "content-type": "application/x-www-form-urlencoded",
        };
        if (ticket != null) {
            headers.ticket = ticket;
        }
        return new Promise(function (resolve, reject) {
            request({
                url: url,
                method: "DELETE",
                json: true,
                headers: headers,
                form: data
            }, function (error, response, data) {
                if (error) {
                    reject(error);
                    return;
                }

                if (response.statusCode == 200) {
                    resolve(data);
                } else {
                    reject(new Error("post server error", {
                        url: url,
                        data: data,
                        ticket: ticket,
                        code: response.statusCode
                    }));
                }
            });
        })
        // get({
        //     url: 'http://example.com',
        //     method: 'POST',
        //     body: 'this is the POST body',

        //     // simple-get accepts all options that node.js `http` accepts
        //     // See: http://nodejs.org/api/http.html#http_http_request_options_callback
        //     headers: {
        //       'user-agent': 'my cool app'
        //     }
        //   }, function (err, res) {
        //     if (err) throw err

        //     // All properties/methods from http.IncomingResponse are available,
        //     // even if a gunzip/inflate transform stream was returned.
        //     // See: http://nodejs.org/api/http.html#http_http_incomingmessage
        //     res.setTimeout(10000)
        //     console.log(res.headers)

        //     res.on('data', function (chunk) {
        //       // `chunk` is the decoded response, after it's been gunzipped or inflated
        //       // (if applicable)
        //       console.log('got a chunk of the response: ' + chunk)
        //     })

        //   })

    },


    post: async function (url, data) {
        this.post(url, data, null);
    },
    post: async function (url, data, ticket) {
        var headers = {
            "content-type": "application/json",
        };
        if (ticket != null) {
            headers.ticket = ticket;
        }
        return new Promise(function (resolve, reject) {
            request({
                url: url,
                method: "POST",
                json: true,
                headers: headers,
                body: data
            }, function (error, response, data) {
                if (error) {
                    reject(error);
                    return;
                }

                if (response.statusCode == 200) {
                    resolve(data);
                } else {
                    logger.error("response.statusCode...", response.statusCode);
                    logger.error("data", data);
                    reject(new Error("post server error", {
                        url: url,
                        data: data,
                        ticket: ticket,
                        code: response.statusCode
                    }));
                }
            });
        })

    },
    putForm: async function (url, data, ticket) {
        return new Promise(function (resolve, reject) {
            request({
                url: url,
                method: "PUT",
                json: true,
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    ticket: ticket
                },
                form: data
            }, function (error, response, data) {
                if (error) {
                    reject(error);
                    return;
                }

                if (response.statusCode == 200) {
                    resolve(data);
                } else {
                    reject(new Error("post server error", {
                        url: url,
                        data: data,
                        ticket: ticket,
                        code: response.statusCode
                    }));
                }
            });
        })

    },
    put: async function (url, data, ticket) {
        return new Promise(function (resolve, reject) {
            request({
                url: url,
                method: "PUT",
                json: true,
                headers: {
                    "content-type": "application/json",
                    ticket: ticket
                },
                body: data
            }, function (error, response, data) {
                if (error) {
                    reject(error);
                    return;
                }

                if (response.statusCode == 200) {
                    resolve(data);
                } else {
                    reject(new Error("post server error", {
                        url: url,
                        data: data,
                        ticket: ticket,
                        code: response.statusCode
                    }));
                }
            });
        })

    },
    patch: async function (url, data, ticket) {
        return new Promise(function (resolve, reject) {
            request({
                url: url,
                method: "PATCH",
                json: true,
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    // "content-type": "application/json",
                    ticket: ticket
                },
                form: data
            }, function (error, response, data) {
                if (error) {
                    reject(error);
                    return;
                }

                if (response.statusCode == 200) {
                    resolve(data);
                } else {
                    reject(new Error("PATCH server error", {
                        url: url,
                        data: data,
                        ticket: ticket,
                        code: response.statusCode
                    }));
                }
            });
        })

    },
    get: async function (url, data) {
        this.get(url, data, null);
    },

    get: async function (url, data, ticket) {
        var headers = {
            "content-type": "application/json",
        };
        if (ticket != null) {
            headers.ticket = ticket;
        }
        var params_str = "";
        if (data)
            for (var key in data) {
                console.log(data[key]);
                if (data[key] || data[key] === 0) {
                    var value = urlencode(data[key]);
                    if (params_str) params_str += "&";
                    params_str += (key + "=" + value);
                }
            }
        if (params_str) url += ("?" + params_str);
        console.log('url', url);
        return new Promise(function (resolve, reject) {
            request({
                url: url,
                method: "GET",
                json: true,
                headers: headers
            }, function (error, response, data) {
                if (error) {
                    reject(error);
                    return;
                }

                if (response.statusCode == 200) {
                    resolve(data);
                } else {
                    reject(new Error("get server error", {
                        url: url,
                        data: data,
                        ticket: ticket,
                        code: response.statusCode
                    }));
                }
            });
        })
    },
    delete: async function (url, data, ticket) {
        var headers = {
            "content-type": "application/json",
        };
        if (ticket != null) {
            headers.ticket = ticket;
        }
        return new Promise(function (resolve, reject) {
            request({
                url: url,
                method: "DELETE",
                json: true,
                headers: headers,
                body: data
            }, function (error, response, data) {
                if (error) {
                    reject(error);
                    return;
                }

                if (response.statusCode == 200) {
                    resolve(data);
                } else {
                    reject(new Error("get server error", {
                        url: url,
                        data: data,
                        ticket: ticket,
                        code: response.statusCode
                    }));
                }
            });
        })
    },
    uploadPost: async function (option) {
        return new Promise(function (resolve, reject) {
            request(option, function (error, response, data) {
                if (!error && response.statusCode == 200) {
                    resolve(data);
                } else {
                    resolve(error);
                }
            });
        })
    },
    postForm: async function (url, data) {
        logger.info(`url:${url}`);
        logger.info(`data:${JSON.stringify(data)}`);
        return new Promise(function (resolve, reject) {
            request({
                url: url,
                method: "POST",
                json: true,
                headers: {
                    "content-type": "multipart/form-data"
                },
                formData: data
            }, function (error, response, data) {
                if (error) {
                    reject(error);
                    return;
                }

                if (response.statusCode == 200) {
                    resolve(data);
                } else {
                    reject(new Error("post server error", {
                        url: url,
                        data: data,
                        code: response.statusCode
                    }));
                }
            });
        })

    },
    uploadFiles: async function (url, file, formData) {
        // url = "http://10.10.10.15:9090/file/upload";
        formData = formData || {};
        formData.files = [{
            value: fs.createReadStream(file.path),
            options: {
                filename: urlencode(file.name),
                contentType: file.mimeType
            }
        }];
        return new Promise(function (resolve, reject) {
            request({
                url: url,
                method: "POST",
                json: true,
                formData: formData
            }, function (error, response, data) {
                if (error) {
                    reject(error);
                    return;
                }
                if (response.statusCode == 200) {
                    resolve(data.data);
                } else {
                    reject(new Error("uploadFiles error", {
                        url: url,
                        files: formData,
                        code: response.statusCode
                    }));
                }
            });
        });
    },
    downloadFile: async function (url, data, filePath) {
        var params_str = "";
        if (data)
            for (var key in data) {
                if (data[key] || data[key] === 0) {
                    var value = urlencode(data[key]);
                    if (params_str) params_str += "&";
                    params_str += (key + "=" + value);
                }
            }
        if (params_str) url += ("?" + params_str);
        return new Promise(function (resolve, reject) {
            let stream = fs.createWriteStream(filePath);
            request(url).pipe(stream).on("close", function (err) {
                console.log("文件[" + filePath + "]下载完毕");
                resolve(filePath);
            });
        });
    },


}
module.exports = httpUtil;