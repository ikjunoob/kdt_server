const express = require("express");
let characters = require("../models/characterModel");
const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.status(200).json({ message: '전체 데이터 가져오기', characters })
    } catch (error) {

        res.status(500).json({ message: '서버 오류' })
    }
})

// 1개 데이터 가져오기
router.get('/:id', (req, res) => {
    try {
        const charId = Number(req.params.id)
        const character = characters.find(c => c.id == charId)

        if (!character) {
            return res.status(404).json({ message: '캐릭터 없음' })
        }

        res.status(200).json({ message: '전체 데이터 가져오기', character })
    } catch (error) {

        res.status(500).json({ message: '서버 오류' })
    }
})



// 데이터 추가하기
router.post('/', (req, res) => {
    try {
        const { name, level, isOnline } = req.body

        if (!name || typeof level !== 'number') {
            res.status(200).json({ message: '전체 데이터 가져오기', characters })
        }

        const newChar = {
            id: Date.now(),
            name,
            level,
            isOnline: isOnline ?? false //빈값인 경우는 null일때   false
        }
        characters.push(newChar)
        res.status(200).json({ message: '게시물 등록 성공', characters })
    } catch (error) {
        res.status(500).json({ message: "서버오류", error })
    }
})

// 1개 데이터 가져오기
router.put('/:id', (req, res) => {
    try {
        const charId = Number(req.params.id)
        const index = characters.findIndex(c => c.id == charId)

        if (index === -1) {
            return res.status(404).json({ message: '캐릭터 없음' })
        }
        const { name, level, isOnline } = req.body
        if (!name || typeof level !== 'number') {
            return res.status(400).json({ message: 'name과 level은 필수 입니다.' })
        }
        characters[index] = {
            ...characters[index],
            name,
            level,
            isOnline: isOnline ?? false
        }
        res.status(200).json({ message: '전체 데이터 가져오기', character: characters[index] })
    } catch (error) {

        res.status(500).json({ message: '서버 오류' })
    }
})

// 1개 데이터 삭제하기
router.delete('/:id', (req, res) => {
    try {
        const charId = Number(req.params.id)
        const index = characters.findIndex(c => c.id == charId)

        if (index === -1) {
            return res.status(404).json({ message: '캐릭터 없음' })
        }

        characters.splice(index, 1)
        res.status(200).json({ message: '전체 데이터 가져오기', characters })
    } catch (error) {

        res.status(500).json({ message: '서버 오류' })
    }
})


module.exports = router