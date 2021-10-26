const vacationsLogic = require("../business-logic-layer/vacations-logic");
const express = require("express");
const path = require("path");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const socketHelper = require("../helpers/socket-helper");
const errorsHelper = require("../helpers/errors-helper");

const router = express.Router();

router.get("/:id", verifyLoggedIn, async (request, response) => {
    try {
        const userId = +request.params.id;
        const vacations = await vacationsLogic.getAllVacationsAsync(userId);
        response.json(vacations);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
})

router.get("/:id", verifyLoggedIn, async (request, response) => {
    try {
        const id = +request.params.id;
        const singleVacation = await vacationsLogic.getSingleVacationAsync(id);
        response.json(singleVacation);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
})


router.post("/", verifyLoggedIn, async (request, response) => {
    try {
        const newVacation = request.body;
        const image = request.files && request.files.image ? request.files.image : null;
        if (!image) return response.status(400).send("Missing image.");
        const addedVacation = await vacationsLogic.addVacationAsync(newVacation, image);
        response.status(201).json(addedVacation);
        socketHelper.vacationAdded(addedVacation)
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
})


router.put("/:id", verifyLoggedIn, async (request, response) => {
    try {
        const id = +request.params.id;
        const vacation = request.body;
        vacation.vacationId = id;
        const image = request.files && request.files.image ? request.files.image : null;
        const updatedVacation = await vacationsLogic.updateVacationAsync(vacation, image);
        response.json(updatedVacation);
        socketHelper.vacationUpdated(updatedVacation);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

router.delete("/:id", verifyLoggedIn, async (request, response) => {
    try {
        const id = +request.params.id;
        await vacationsLogic.deleteVacationAsync(id);
        response.sendStatus(204);
        socketHelper.vacationDeleted(id);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});


router.get("/images/:name", async (request, response) => {
    try {
        const name = request.params.name;
        const absolutePath = path.join(__dirname, "..", "images", "vacations", name);
        response.sendFile(absolutePath);;
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

module.exports = router;