import multer from "multer";

const uplaod = multer({storage : multer.diskStorage({})})

export default uplaod;