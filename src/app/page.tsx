'use client'
import { useEffect, useState } from "react"

interface Setting {
  setting_key: string;
  setting_value: string;
}
export default function Home() {
  
  const [settingsList, setSettingsList]=useState<any>()
  const [username, setUsername]=useState<string>("")
  const [settings, setSettings] = useState<Setting[] | undefined>();
  useEffect(()=>{
    getSettings().then((res)=>{setSettingsList(res); setSettings(res.settings)})
  },[])

  return (
<main className="flex flex-col mt-2 text-sm">
  <div className=" grid grid-cols-2">
  <div className="">
      <h3 className=" font-semibold">username или ссылка-приглашение</h3>
      <input type="text" className=" border-black border-2" value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUsername(e.target.value)}/>
      <button  className=" bg-sky-500 p-1 text-white" onClick={()=>{username !=="" && handleAddPublic(username, setSettingsList, setUsername)}}>Добавить</button>
    <div className="">
      <h3 className="mt-5 font-semibold">Username каналов</h3>
      {settingsList ? (
        settingsList?.usernames?.map((user: any, index: number) => (
          <div key={user.id} className="p-1">
            <span className="">{index + 1}) {user.username} </span>
            <button className="bg-red-600 p-1 text-white" onClick={()=>handleDelete(user.id, setSettingsList)}>Удалить</button>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
          </div>
    </div>
    <div className="flex flex-col">
      <h3 className=" font-semibold">Settings</h3>
      {settings ? (
        settings?.map((user: any, index: number) => (
          <div key={index} className="p-1 inline-block">
            <span className=""> {user.setting_key} </span>
            <input type="text" value={user.setting_value} onChange={(e) => {
          const updatedSettings = [...settings];
          updatedSettings[index].setting_value = e.target.value;
          setSettings(updatedSettings);
          setVars(user.setting_key, user.setting_value)
        }} className="border-2 w-auto"/>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
      <span>Similar posts: количество совпадений с исходным {'>'} N</span>
      <br/>
      <span>time_diff: время отслеживания поста/сек</span>
      <br/>
      <span>similar_percent: процент совпадений /100</span>
    </div>
    </div>
  </main>
  )
}


const getSettings = async () => {
  try {
    const res = await fetch(`https://sever.spbd.io/settings.php`, {
      method: "GET"
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const handleDelete = async (idToSend: number, setSettingsList: React.Dispatch<any>) => {
  try {
    await fetch(`https://sever.spbd.io/settings.php`, {
      method: "POST",
      body: JSON.stringify({
        id: idToSend
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const updatedSettings = await getSettings();
    setSettingsList(updatedSettings);
  } catch (error) {
    console.error(error);
  }
};

const handleAddPublic = async (username: string, setSettingsList: React.Dispatch<any>, setUsername: React.Dispatch<string>) => {
  setUsername("")
  try {
    await fetch(`https://sever.spbd.io/usernames.php`, {
      method: "POST",
      body: JSON.stringify({
        username: username
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const updatedSettings = await getSettings();
    setSettingsList(updatedSettings);
  } catch (error) {
    console.error(error);
  }
};

const setVars = async (setting_key: string, setting_value: string) => {
  try {
    await fetch(`https://sever.spbd.io/editvar.php`, {
      method: "POST",
      body: JSON.stringify({
        setting_key,
        setting_value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error(error);
  }
};
