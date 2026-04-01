import { useState } from "react";
import { FileTree } from "../components/FileTree";
import { Preview } from "../components/Preview";

export default function Browser() {
    const [selectedUrl, setSelectedUrl] = useState('/NuclearClassroom/assets/egs/sop/EGS%20SOP-SCRAM-QC%20v2%20(1).pdf');

    return (
        <>
            <section id="header"></section>
            <section id="center" className="w-full h-full">
                <div className="flex w-full h-full">
                    <FileTree onSelectFile={setSelectedUrl} path="egs" />
                    <div className="w-full">
                        <Preview url={selectedUrl} />
                    </div>
                </div>
            </section>
        </>
    )
}