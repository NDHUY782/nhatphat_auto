import { Request, Response, NextFunction } from 'express'
import { uploadCloudinary } from '~/constants/cloudinary'
import introService from '~/services/intro.service'

export const createIntroController = async (req: Request, res: Response, next: NextFunction) => {
  const files = (req.files as Express.Multer.File[]) || []
  const uploadedUrls: string[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    const fileName = `intro-${Date.now()}-${i}`
    const uploadedUrl = await uploadCloudinary(imageBase64, fileName)
    uploadedUrls.push(uploadedUrl)
  }

  const result = await introService.createIntro({
    title: req.body.title,
    name: req.body.name,
    content: req.body.content,
    images: uploadedUrls
  })

  return res.json(result)
}

export const getAllIntrosController = async (req: Request, res: Response, next: NextFunction) => {
  const intros = await introService.getAllIntros()
  return res.json(intros)
}

export const getIntroByIdController = async (req: Request, res: Response, next: NextFunction) => {
  const intro = await introService.getIntroById(req.params.id)
  return res.json(intro)
}

export const updateIntroController = async (req: Request, res: Response, next: NextFunction) => {
  const updated = await introService.updateIntro(req.params.id, req.body)
  return res.json(updated)
}

export const deleteIntroController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await introService.deleteIntro(req.params.id)
  return res.json(result)
}
