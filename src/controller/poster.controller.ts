import { Request, Response, NextFunction } from 'express'
import { uploadCloudinary } from '~/constants/cloudinary'
import posterService from '~/services/poster.service'

// ----------- CREATE -----------
export const createPosterController = async (req: Request, res: Response, next: NextFunction) => {
  const files = req.files as Express.Multer.File[]
  const introImages: string[] = []
  const contractImages: string[] = []
  const adviseImages: string[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const fieldname = file.fieldname
    const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    const uploadedUrl = await uploadCloudinary(imageBase64, `poster-${fieldname}-${Date.now()}-${i}`)

    if (fieldname === 'images_intro') introImages.push(uploadedUrl)
    else if (fieldname === 'images_contract') contractImages.push(uploadedUrl)
    else if (fieldname === 'images_advise') adviseImages.push(uploadedUrl)
  }

  const result = await posterService.createPoster({
    images_intro: introImages,
    images_contract: contractImages,
    images_advise: adviseImages
  })

  return res.json(result)
}

// ----------- GET 1 (only) -----------
export const getPosterController = async (req: Request, res: Response, next: NextFunction) => {
  const poster = await posterService.getPoster()

  if (!poster) {
    return res.status(404).json({ message: 'Poster not found' })
  }

  return res.json({
    intro: poster.images_intro?.[0] || null,
    contract: poster.images_contract?.[0] || null,
    advise: poster.images_advise?.[0] || null
  })
}

// ----------- UPDATE -----------
export const updatePosterController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const files = req.files as Express.Multer.File[]
  const introImages: string[] = []
  const contractImages: string[] = []
  const adviseImages: string[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const fieldname = file.fieldname
    const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    const uploadedUrl = await uploadCloudinary(imageBase64, `poster-${fieldname}-${Date.now()}-${i}`)

    if (fieldname === 'images_intro') introImages.push(uploadedUrl)
    else if (fieldname === 'images_contract') contractImages.push(uploadedUrl)
    else if (fieldname === 'images_advise') adviseImages.push(uploadedUrl)
  }

  const result = await posterService.updatePoster(id, {
    images_intro: introImages,
    images_contract: contractImages,
    images_advise: adviseImages
  })

  return res.json(result)
}

// ----------- DELETE -----------
export const deletePosterController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const result = await posterService.deletePoster(id)
  return res.json(result)
}
