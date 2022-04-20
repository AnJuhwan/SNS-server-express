"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = exports.signupEmailCheck = exports.signNickNameCheck = void 0;
const userModel_1 = __importDefault(require("../Model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const signNickNameCheck = (req, res) => {
    userModel_1.default.findOne({ nickName: req.body.nickName })
        .exec()
        .then((item) => {
        if (item) {
            return res.status(400).json({ success: false, messgae: '이미 존재하는 닉네임 입니다.' });
        }
        res.status(200).json({ succes: true, message: '사용 가능한 닉네임 입니다.' });
    })
        .catch((error) => {
        res.status(500).json({ success: false, message: 'server Error' });
        console.log(error);
    });
};
exports.signNickNameCheck = signNickNameCheck;
const signupEmailCheck = (req, res) => {
    userModel_1.default.findOne({ email: req.body.email })
        .exec()
        .then((item) => {
        console.log(item);
        if (item) {
            return res.status(400).json({ success: false, messgae: '이미 존재하는 이메일 입니다.' });
        }
        res.status(200).json({ succes: true, message: '사용 가능한 이메일 입니다.' });
    })
        .catch((error) => {
        res.status(500).json({ success: false, message: 'server Error' });
        console.log(error);
    });
};
exports.signupEmailCheck = signupEmailCheck;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hashed = yield bcrypt_1.default.hash(req.body.password, 12);
    let temp = {
        email: req.body.email,
        password: hashed,
        nickName: req.body.nickName,
        profile: req.body.profile,
    };
    const userSignup = new userModel_1.default(temp);
    userSignup
        .save()
        .then(() => {
        res.status(200).json({ success: true, user: userSignup });
    })
        .catch((error) => {
        console.log(error);
        res.status(400).json({ success: false, message: 'server error' });
    });
});
exports.signup = signup;
const login = (req, res, next) => {
    userModel_1.default.findOne({ email: req.body.email })
        .exec()
        .then((item) => {
        if (!item) {
            return res
                .status(400)
                .json({ success: false, message: '1아이디,비밀번호를 확인해주세요.' });
        }
        next();
    })
        .catch((err) => res.status(500).json({ success: false, message: 'server Error' }));
    // User.findOne({ password: req.body.password })
    //   .exec()
    //   .then((item) => {
    //     console.log(item);
    //     if (!item) {
    //       return res
    //         .status(400)
    //         .json({ success: false, message: '2아이디,비밀번호를 확인해주세요.' });
    //     }
    //   });
};
exports.login = login;
