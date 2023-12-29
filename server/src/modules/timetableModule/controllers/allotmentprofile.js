const HttpException = require("../../../models/http-exception");
const AddAllotment = require("../../../models/allotment");
const addRoom=require("../../../models/addroom");

const TimeTabledto = require("../dto/timetable");
const TimeTableDto = new TimeTabledto();

const AddRoomController = require("../controllers/addroomprofile");
const addRoomController = new AddRoomController();

class AllotmentController {
  async AddAllotment(req, res) {
    const newallotment = req.body;
    const session = newallotment.session;
  
    try {
      const existingAllotment = await AddAllotment.findOne({ session: session });
      
      if (!existingAllotment) {
        // If the session doesn't exist, create a new allotment
        const createdAllotment = await AddAllotment.create(newallotment);  
        res.json(createdAllotment);
      } else {
        // If the session exists, update the existing allotment
        const updatedAllotment = await AddAllotment.updateOne({ session: session }, newallotment);
        
        const codes = await TimeTableDto.getAllCodesOfSession(session);
        for (let code of codes)
        {
          await addRoomController.deleteCentralisedRoomByCode(code);
          const ttdetails = await TimeTableDto.getTTdetailsByCode(code);
          const centralisedAllotments = newallotment.centralisedAllotments;
          const openElectiveAllotments = newallotment.openElectiveAllotments;
          const centralisedDept = centralisedAllotments.find((item) => item.dept === ttdetails.dept) || { rooms: [] };
          const electiveDept = openElectiveAllotments.find((item) => item.dept === ttdetails.dept) || { rooms: [] };
          const combinedRooms = [...centralisedDept.rooms, ...electiveDept.rooms];
          if(combinedRooms)
          {
          for (const room of combinedRooms) {
            await addRoom.create({ room: room.room, code: code, type:'Centralised Classroom' });
          }
        }
      }
        res.json(updatedAllotment);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
        
      async getAllotment(req, res) {
       try {
        let session=''
        if(req.query.code)
        {
        session= await TimeTableDto.getSessionByCode(req.query.code)
        }
        else
        {  
        session=req.query.session;
        }

        try {
          const list = await AddAllotment.find({ session});
          return list;
        } catch (error) {
          console.error('Error fetching allotment:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
        
        } catch (error) {
          console.error(error); 
          res.status(500).json({ error: "Internal server error" });
        }
      }

      async getSessions() {
        try {
          const uniqueSessions = await AddAllotment.distinct('session');
          return uniqueSessions;
        } catch (error) {
          throw error; 
        }
      }

      async getAllotmentById(id) {
        if (!id) {
          throw new HttpException(400, "Invalid Id");
        }
        try {
          const data = await AddAllotment.findById(id);
          if (!data) throw new HttpException(400, "data does not exists");
          return data;
        } catch (e) {
          throw new HttpException(500, e.message || "Internal Server Error");
        }
      }

      async updateID(id, announcement) {
        if (!id) {
          throw new HttpException(400, "Invalid Id");
        }
        // if (!isValidAnnouncement(announcement)) {
        //   return res.status(400).json({ error: "Invalid Announcement data" });
        // }
        try {
          await AddAllotment.findByIdAndUpdate(id, announcement);
        } catch (e) {
          throw new HttpException(500, e.message || "Internal Server Error");
        }
      }

      async deleteId(id) {
        if (!id) {
          throw new HttpException(400, "Invalid Id");
        }
        try {
          await AddAllotment.findByIdAndDelete(id);
        } catch (e) {
          throw new HttpException(500, e.message || "Internal Server Error");
        }
      }
    }

module.exports = AllotmentController;


