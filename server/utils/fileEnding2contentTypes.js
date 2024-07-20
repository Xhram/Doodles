function convertFileEndingToContentTypes(ending){
    for (let i = 0; i < types.length; i++) {
        const type = types[i];
        if(ending.includes(type.ending)){
            return type.type;
        }
    }
    return "multipart/form-data; boundary=something"
}
var types = [
    {
        "ending":"js",
        "type":"text/javascript; charset=utf-8"
    },
    {
        "ending":"html",
        "type":"text/html; charset=utf-8"
    },
    {
        "ending":"css",
        "type":"text/css; charset=utf-8"
    },
    {
        "ending":"json",
        "type":"application/json; charset=utf-8"
    },
    {
        "ending":"xml",
        "type":"application/xml; charset=utf-8"
    },
    {
        "ending":"pdf",
        "type":"application/pdf"
    },
    {
        "ending":"txt",
        "type":"text/plain; charset=utf-8"
    },
    {
        "ending":"jpg",
        "type":"image/jpeg"
    },
    {
        "ending":"png",
        "type":"image/png"
    },
    {
        "ending":"gif",
        "type":"image/gif"
    },
    {
        "ending":"svg",
        "type":"image/svg+xml"
    },
    {
        "ending":"ico",
        "type":"image/x-icon"
    },
    {
        "ending":"mp3",
        "type":"audio/mpeg"
    },
    {
        "ending":"wav",
        "type":"audio/wav"
    },
    {
        "ending":"mp4",
        "type":"video/mp4"
    },
    {
        "ending":"webm",
        "type":"video/webm"
    },
    {
        "ending":"ogg",
        "type":"video/ogg"
    },
    {
        "ending":"zip",
        "type":"application/zip"
    },
    {
        "ending":"rar",
        "type":"application/x-rar-compressed"
    },
    {
        "ending":"tar",
        "type":"application/x-tar"
    },
    {
        "ending":"csv",
        "type":"text/csv; charset=utf-8"
    },
    {
        "ending":"doc",
        "type":"application/msword"
    },
    {
        "ending":"docx",
        "type":"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    },
    {
        "ending":"xls",
        "type":"application/vnd.ms-excel"
    },
    {
        "ending":"xlsx",
        "type":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    },
    {
        "ending":"ppt",
        "type":"application/vnd.ms-powerpoint"
    },
    {
        "ending":"pptx",
        "type":"application/vnd.openxmlformats-officedocument.presentationml.presentation"
    },
    {
        "ending":"odt",
        "type":"application/vnd.oasis.opendocument.text"
    },
    {
        "ending":"ods",
        "type":"application/vnd.oasis.opendocument.spreadsheet"
    },
    {
        "ending":"gif",
        "type":"image/gif"
    },
    {
        "ending":"odp",
        "type":"application/vnd.oasis.opendocument.presentation"
    }
]
export {convertFileEndingToContentTypes}