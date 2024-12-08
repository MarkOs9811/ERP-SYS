import { CategoriaList } from "../components/componentePlatos/CategoriaList";
import { PlatoList } from "../components/componentePlatos/PlatoList";

export function MenuPlato(){
    return(
        <div className="row g-3">
            <div className="col-md-4">
                <div className="card p-3 shadow-sm">
                    <CategoriaList/>
                </div>
            </div>
            <div className="col-md-8">
                <div className="card p-3 shadow-sm">
                    <PlatoList/>
                </div>
            </div>
        </div>
    );
}   