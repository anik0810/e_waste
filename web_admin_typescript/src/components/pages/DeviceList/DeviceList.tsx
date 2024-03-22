import { useEffect, useState } from "react"
import { DeviceInterface } from "../../../@types/interface/deviceDetails/DeviceInterface"
import { getAllDeviceList } from "../../../utils/apis/Apis";
import DataTable from "../../shared/DataTable/DataTable";
import Spinner from "../../shared/spinner/Spinner";
import axios from "axios";

const DeviceList = () => {
  const [deviceList, setDeviceList] = useState<DeviceInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getDeviceList = async () => {
    setLoading(true);
    const response = await getAllDeviceList();
    setLoading(false);
    if (response?.status === 200) {
      setDeviceList(response?.data.data);
    }
  }
  const handleRefresh = async() =>{
    await getDeviceList();
  }
  const handleGetPercentange = async () =>{
    const response = await axios.get("https://api.thingspeak.com/channels/2481035/feeds.json?api_key=F3Z75IDGBK134C1Y");
    if(response.status===200){
      const {data:{feeds}} = response;
      setDeviceList(prevDeviceList => {
        if (feeds.length > 0) {
            return prevDeviceList.map((device, index) => {
                if (index === 0) {
                    return { ...device, e_waste: feeds[feeds.length-1].field2 };
                }
                return device;
            });
        }
        return prevDeviceList; // If feeds is empty, return the previous state unchanged
    });
    }
  }
  useEffect(() => {
    getDeviceList();
  }, []);

 useEffect(() => {
    const intervalId = setInterval(handleGetPercentange, 2000);

    // Clean up the interval when the component unmounts or when you want to stop it
    return () => clearInterval(intervalId);
}, []);

  return (
    <div>
      {
        (loading) ? <Spinner /> :
          <DataTable deviceList={deviceList} handleRefresh={handleRefresh}/>
      }
    </div>
  )
}

export default DeviceList