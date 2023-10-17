import { google } from "googleapis";
import dotenv from 'dotenv';

dotenv.config();

const GoogleKey = process.env.GOOGLE_KEY;

export const youtube = async (req, res) => {

    const { url } = req.body;

    try {

        const response = await google.youtube('v3').videos.list({
            key: GoogleKey,
            part: "statistics, snippet",
            id: url
        })

        const data = response.data;
        const channelId = data?.items[0]?.snippet?.channelId;
        const dataForSubs = await google.youtube('v3').channels.list({
            key: GoogleKey,
            part: "statistics",
            id: channelId
        })
        const dataForSubsData = dataForSubs.data;
        const subscribers = dataForSubsData?.items[0]?.statistics?.subscriberCount;
        const channelResponse = await google.youtube('v3').search.list({
            key: GoogleKey,
            part: "snippet",
            channelId,
            maxResults: 5,
            order: "viewCount"
        })
        const channelData = channelResponse.data;
        const vidList = channelData?.items?.map(item => {
            const vidId = item?.id?.videoId;
            return vidId;
        })

        const vidListResponse = await google.youtube('v3').videos.list({
            key: GoogleKey,
            part: "statistics, snippet",
            id: vidList
        })
        const vidListResponseData = vidListResponse.data;
        

        res.status(200).json({ data, vidListResponseData, subscribers });

    }catch(e){
        console.log(e);
        res.status(400).json({ error: e })
    }
}