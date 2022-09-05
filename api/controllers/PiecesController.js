const PiecesService = require('../services/pieces');

class PiecesController {

    // pieces Category Functions
    
    async createPiece (req, res) {
        const user = req.user;

        if (!req.file) return { error: "Please upload a banner image", statusCode: 400 }

        let banner_image = req.file.filename;

        let { title, is_active  } = req.body;

        if (!title) return { error: "Please fill out all fields", statusCode: 400 }

        let piece;
        try {
            piece = await PiecesService.createPiece(title, banner_image, is_active , user.id)
        } catch (error) {
            return { message: "Error creating piece, please try again later", err: error, statusCode: 500 }
        }
    
        return { message: "Successfully created piece!", piece, statusCode: 200 }
    }

    async editPiece (req, res) {
        const user = req.user;
        let id = req.params.id;

        id = parseInt(id);

        if (!id) return { error: "Please provide a piece ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid piece ID", statusCode: 400 }

        let piece = await PiecesService.getPiece(id)

        if (!piece) return { error: "piece not found", statusCode: 404 }

        if (!req.file) return { error: "Please upload a banner image", statusCode: 400 }

        let banner_image = req.file.filename;
        if (!banner_image) {
            banner_image = piece.banner_image;
        }

        let { title, is_active  } = req.body;

        if (!title) return { error: "Please fill out all fields", statusCode: 400 }

        piece = null;
        try {
            piece = await PiecesService.editPiece(id, title, banner_image, is_active , user.id);
        } catch (error) {
            return { message: "Error editing piece, please try again later", err: error, statusCode: 500 }
        }

        
        return { message: "Successfully edited piece!", piece, statusCode: 200 }
    }

    async deletePiece(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a piece ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid piece ID", statusCode: 400 }

        const piece = await PiecesService.getPiece(id);

        if (!piece) return { error: "piece not found", statusCode: 404 }

        try {
            await PiecesService.deletePiece(id);
        } catch (error) {
            return { message: "Error deleting piece, please try again later", err: error, statusCode: 500 }
        }

        return { piece, statusCode: 200 }
    }

    async getAllPieces(req, res) {
        let { limit, page, language_id, is_active } = req.query;
        
        page = parseInt(page);

        if(!language_id) language_id = 1;
        if(!page || typeof page !== "number") page = 1;
        if(is_active == null || is_active == undefined) is_active = 'all';

        const pieces = await PiecesService.getPieces(limit, page, language_id, is_active)

        let piecesCount = await PiecesService.getPiecesCount(language_id, is_active)
        
        let pagesAvailable = Math.ceil(piecesCount / limit);

        return { pieces, pagesAvailable, statusCode: 200 }
    }

    async getPiece(req, res) {
        let { id } = req.params;

        id = parseInt(id);

        if (!id) return { error: "Please provide a piece ID", statusCode: 400 }
        if (typeof id !== "number") return { error: "Please provide a valid piece ID", statusCode: 400 }

        const piece = await PiecesService.getPiece(id);

        if (!piece) return { error: "piece not found", statusCode: 404 }

        return { piece, statusCode: 200 }
    }

    async getPieceWithSlug(req, res) {
        let { slug } = req.params;

        if (!slug) return { error: "Please provide a piece slug", statusCode: 400 }

        const piece = await PiecesService.getPieceWithSlug(slug);

        if (!piece) return { error: "Piece not found", statusCode: 404 }

        return { piece, statusCode: 200 }
    }
}

module.exports = new PiecesController();