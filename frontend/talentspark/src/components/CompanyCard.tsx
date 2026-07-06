import type {Company} from "../types/company";
import type {Job} from "../types/job";
import {useState} from "react";

type Props = {
    companies:Company[];
    jobs:Job[];
    onEdit: (company:Company)=>void;
    onDelete: (id:number)=>void;
    onAdd: (company:Company)=>void;
}


function CompanyCard({
    companies,jobs,onAdd,onEdit,onDelete}:Props){
    const [editCompanyId, setEditCompanyId] = useState<number | null>(null);
    const [addform,setAddform] = useState<Company>({
        id:0,
        name:"",
        email:"",
        phone:"",
        location:"",
        jobs:[]
    });
    const [editform,setEditform] = useState<Company>({
        id:0,
        name:"",
        email:"",
        phone:"",
        location:"",
        jobs:[]
    });
    const handleAdd = () => {
        onAdd(addform);
        setAddform({
            id:0,
            name:"",
            email:"",
            phone:"",
            location:"",
            jobs:[]
        })
    }
    const handleSave = () => {
        onEdit(editform);
        setEditCompanyId(null);
        setEditform({
            id:0,
            name:"",
            email:"",
            phone:"",
            location:"",
            jobs:[]
        })
    } 
    const handlecancel = () => {
        setEditCompanyId(null);
        setEditform({
            id:0,
            name:"",
            email:"",
            phone:"",
            location:"",
            jobs:[]
        })
    } 

    return(
        <div className="section-card">
            <div className="section-header">
                <div>
                    <h2>Company Directory</h2>
                    <p>Manage companies and monitor their active hiring needs.</p>
                </div>
                <div className="section-pill">{companies.length} companies</div>
            </div>

            <div className="data-list">
                {companies.map((company) => {
                    const openingCount = jobs.filter(j => j.company_id === company.id).length;
                    return (
                        <div className="data-card" key={company.id}>
                            {editCompanyId === company.id ? (
                                <div className="form-card">
                                    <input type="text" value={editform.name} onChange={(e)=>setEditform({...editform,name:e.target.value})} placeholder="Name" />
                                    <input type="text" value={editform.email} onChange={(e)=>setEditform({...editform,email:e.target.value})} placeholder="Email" />
                                    <input type="text" value={editform.phone} onChange={(e)=>setEditform({...editform,phone:e.target.value})} placeholder="Phone" />
                                    <input type="text" value={editform.location} onChange={(e)=>setEditform({...editform,location:e.target.value})} placeholder="Location" />
                                    <div className="action-row">
                                        <button className="action-btn primary" onClick={handleSave}>Save</button>
                                        <button className="action-btn secondary" onClick={handlecancel}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="data-top">
                                        <div>
                                            <h3>{company.name}</h3>
                                            <p className="data-subtitle">{company.location}</p>
                                        </div>
                                        <div className="section-pill soft">{openingCount} opening{openingCount === 1 ? '' : 's'}</div>
                                    </div>
                                    <div className="data-meta">
                                        <p><strong>Email:</strong> {company.email}</p>
                                        <p><strong>Phone:</strong> {company.phone}</p>
                                    </div>
                                    <div className="action-row">
                                        <button
                                            className="action-btn secondary"
                                            onClick={() => {
                                                setEditCompanyId(company.id);
                                                setEditform({
                                                    id: company.id,
                                                    name: company.name,
                                                    email: company.email,
                                                    phone: company.phone,
                                                    location: company.location,
                                                    jobs: company.jobs,
                                                });
                                            }}
                                        >Edit</button>
                                        <button className="action-btn danger" onClick={() => onDelete(company.id)}>Delete</button>
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="form-card">
                <h3>Add Company</h3>
                <input type="text" value={addform.name} onChange={(e)=>setAddform({...addform,name:e.target.value})} placeholder="Name" />
                <input type="text" value={addform.email} onChange={(e)=>setAddform({...addform,email:e.target.value})} placeholder="Email" />
                <input type="text" value={addform.phone} onChange={(e)=>setAddform({...addform,phone:e.target.value})} placeholder="Phone" />
                <input type="text" value={addform.location} onChange={(e)=>setAddform({...addform,location:e.target.value})} placeholder="Location" />
                <button className="action-btn primary" onClick={handleAdd}>Add Company</button>
            </div>
        </div>
    )
}

export default CompanyCard