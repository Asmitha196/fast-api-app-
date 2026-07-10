import type {Job} from "../types/job";
import type {Company} from "../types/company";

import {useState, useEffect} from "react";

type Props = {
    jobs:Job[];
    companies:Company[];
    onEdit: (job:Job)=>void;
    onDelete: (id:number)=>void;
    onAdd: (job:Job)=>void;
}

function JobCard({
    jobs,companies,onEdit,onDelete,onAdd}:Props){
        const [editJobId, setEditJobId] = useState<number | null>(null);
        const [addform,setAddform] = useState<Job>({
            id:0,
            title:"",
            description:"",
            salary:0,
            company_id:0
        });
        const [editform,setEditform] = useState<Job>({
            id:0,
            title:"",
            description:"",
            salary:0,
            company_id:0
        });

        useEffect(() => {
            if (companies.length > 0 && addform.company_id === 0) {
                setAddform(prev => ({ ...prev, company_id: companies[0].id }));
            }
        }, [companies]);
        const handleAdd = async () => {
            if (!addform.title || addform.salary <= 0 || addform.company_id <= 0) {
                return;
            }
            await onAdd(addform);
            setAddform({
                id:0,
                title:"",
                description:"",
                salary:0,
                company_id: companies.length > 0 ? companies[0].id : 0
            })
        }
        const handleSave = () => {
            onEdit(editform);
            setEditJobId(null);
            setEditform({
                id:0,
                title:"",
                description:"",
                salary:0,
                company_id:0
            })
        }
        const handlecancel = () => {
            setEditJobId(null);
            setEditform({
                id:0,
                title:"",
                description:"",
                salary:0,
                company_id:0
            })
        }

        const canAddJob = Boolean(addform.title.trim() && addform.salary > 0 && addform.company_id > 0);
        const addJobValidationMessage = !addform.title.trim()
            ? "Title is required."
            : addform.salary <= 0
                ? "Salary must be greater than 0."
                : addform.company_id <= 0
                    ? "Select a company."
                    : "";

    return(
        <div className="section-card">
            <div className="section-header">
                <div>
                    <h2>Job Listings</h2>
                    <p>Keep track of open roles and their associated companies.</p>
                </div>
                <div className="section-pill">{jobs.length} jobs</div>
            </div>

            <div className="data-list">
                {jobs.map((job) => (
                    <div className="data-card" key={job.id}>
                        {editJobId === job.id ? (
                            <div className="form-card">
                                <input type="text" value={editform.title} onChange={(e)=>setEditform({...editform,title:e.target.value})} placeholder="Title" />
                                <input type="text" value={editform.description} onChange={(e)=>setEditform({...editform,description:e.target.value})} placeholder="Description" />
                                <input type="number" min={0} value={editform.salary} onChange={(e)=>setEditform({...editform,salary:Number(e.target.value)})} placeholder="Salary" />
                                <select value={editform.company_id} onChange={(e)=>setEditform({...editform,company_id:Number(e.target.value)})}>
                                    <option value={0} disabled>Select company</option>
                                    {companies.map(company => (
                                        <option key={company.id} value={company.id}>{company.name}</option>
                                    ))}
                                </select>
                                <div className="action-row">
                                    <button className="action-btn primary" onClick={handleSave}>Save</button>
                                    <button className="action-btn secondary" onClick={handlecancel}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="data-top">
                                    <div>
                                        <h3>{job.title}</h3>
                                        <p className="data-subtitle">{companies.find(c => c.id === job.company_id)?.name || job.company_id}</p>
                                    </div>
                                    <div className="section-pill soft">{job.salary}</div>
                                </div>
                                <div className="data-meta">
                                    <p><strong>Description:</strong> {job.description}</p>
                                </div>
                                <div className="action-row">
                                    <button
                                        className="action-btn secondary"
                                        onClick={() => {
                                            setEditJobId(job.id);
                                            setEditform({
                                                id: job.id,
                                                title: job.title,
                                                description: job.description,
                                                salary: job.salary,
                                                company_id: job.company_id,
                                            });
                                        }}
                                    >Edit</button>
                                    <button className="action-btn danger" onClick={() => onDelete(job.id)}>Delete</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className="form-card">
                <h3>Add Job</h3>
                <input type="text" value={addform.title} onChange={(e)=>setAddform({...addform,title:e.target.value})} placeholder="Title" />
                <input type="text" value={addform.description} onChange={(e)=>setAddform({...addform,description:e.target.value})} placeholder="Description" />
                <input type="number" min={0} value={addform.salary} onChange={(e)=>setAddform({...addform,salary:Number(e.target.value)})} placeholder="Salary" />
                <select value={addform.company_id} onChange={(e)=>setAddform({...addform,company_id:Number(e.target.value)})}>
                    <option value={0} disabled>{companies.length ? "Select company" : "No companies available"}</option>
                    {companies.map(company => (
                        <option key={company.id} value={company.id}>{company.name}</option>
                    ))}
                </select>
                <button
                    className="action-btn primary"
                    onClick={handleAdd}
                    disabled={!canAddJob}
                >Add Job</button>
                {addJobValidationMessage && (
                    <p className="validation-message">{addJobValidationMessage}</p>
                )}
            </div>
        </div>
    )
}

export default JobCard