const express = require("express")
const router = express.Router()

let boards = require("../models/boardModel")
let initId = 1

// 게시글 생성 (/boards)
router.post("/boards", (req, res) => {
    try {
        const newBoard = {
            id: initId++,
            displayId: boards.length + 1,
            title: req.body.title,
            content: req.body.content,
            createdAt: new Date().toISOString()
        }
        boards.push(newBoard)
        res.status(201).json({ message: "게시글 생성 완료", boards })
    } catch (error) {
        console.error("게시글 생성 중 오류", error)
        res.status(500).json({ message: "서버 오류" })
    }
})

// 게시글 추가 (/)
router.post("/", (req, res) => {
    try {
        const { title, content } = req.body
        if (!title || !content) {
            return res.status(400).json({ message: "제목과 내용을 모두 입력하세요" })
        }

        const newBoard = {
            id: Date.now(),
            title,
            content,
            createdAt: new Date().toISOString()
        }
        boards.push(newBoard)
        res.status(200).json({ message: "게시물 등록 성공", boards })
    } catch (error) {
        res.status(500).json({ message: "서버오류", error })
    }
})

// 게시글 수정
router.put("/:id", (req, res) => {
    try {
        const boardId = Number(req.params.id)
        const index = boards.findIndex(item => item.id === boardId)

        if (index === -1) {
            return res.status(404).json({ message: "게시물을 찾을 수 없음" })
        }

        const updateData = req.body
        boards[index] = {
            ...boards[index],
            ...updateData
        }

        res.status(200).json({
            message: "1개 게시물 수정 완료",
            board: boards[index]
        })
    } catch (error) {
        res.status(500).json({ message: "서버오류", error })
    }
})

// 게시글 삭제
router.delete("/:id", (req, res) => {
    try {
        const boardId = Number(req.params.id)
        const index = boards.findIndex(item => item.id === boardId)

        if (index === -1) {
            return res.status(404).json({ message: "게시물을 찾을 수 없음" })
        }

        boards.splice(index, 1)
        res.status(200).json({
            message: "1개 게시물 삭제 완료",
            boards
        })
    } catch (error) {
        res.status(500).json({ message: "서버오류", error })
    }
})

// 전체 게시글 조회
router.get("/", (req, res) => {
    try {
        res.status(200).json({ message: "전체 게시물 가져오기", boards })
    } catch (error) {
        res.status(500).json({ message: "서버오류", error })
    }
})

// 게시글 1개 조회
router.get("/:id", (req, res) => {
    try {
        const boardId = Number(req.params.id)
        const board = boards.find(item => item.id === boardId)

        if (!board) {
            return res.status(404).json({ message: "게시물을 찾을 수 없음" })
        }

        res.status(200).json({
            message: "1개 게시물 가져오기",
            board
        })
    } catch (error) {
        res.status(500).json({ message: "서버오류", error })
    }
})

// 게시글 제목만 수정
app.patch("/boards/:id/title", (req, res) => {
    try {
        const boardId = Number(req.params.id)
        const index = boards.findIndex(b => b.id === boardId)

        if (index === -1) {
            return res.status(404).json({ message: "게시글 일부 수정 중 아이디가 없음" })
        }

        const { title } = req.body

        if (typeof title !== "string" || title.trim() === "") {
            return res.status(400).json({
                message: "타이틀은 비어있지 않은 문자열 이어야 합니다."
            })
        }

        boards[index] = {
            ...boards[index],
            title: title.trim()
        }

        res.status(200).json({ message: "게시글 제목 수정하기 완료", board: boards[index] })
    } catch (error) {
        console.error("게시글 제목 수정 중 오류", error)
        res.status(500).json({ message: "서버 오류" })
    }
})


// 게시글 내용(content)만 수정
app.patch("/boards/:id/content", (req, res) => {
    try {
        const boardId = Number(req.params.id)
        const index = boards.findIndex(b => b.id === boardId)

        if (index === -1) {
            return res.status(404).json({ message: "게시글 컨텐츠 수정 중 아이디가 없음" })
        }

        const { content } = req.body

        if (typeof content !== "string" || content.trim() === "") {
            return res.status(400).json({
                message: "컨텐츠는 비어있지 않은 문자열 이어야 합니다."
            })
        }

        boards[index] = {
            ...boards[index],
            content: content.trim()
        }

        res.status(200).json({ message: "게시글 컨텐츠 수정하기 완료", board: boards[index] })
    } catch (error) {
        console.error("게시글 컨텐츠 수정 중 오류", error)
        res.status(500).json({ message: "서버 오류" })
    }
})


module.exports = router
