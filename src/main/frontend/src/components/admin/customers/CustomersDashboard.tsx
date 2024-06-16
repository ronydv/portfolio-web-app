import { useFetch } from "../../../hooks/useFetch";

const CustomersDashboard = () => {
    const {data}=useFetch<User>("/api/v1/users/user");
    console.log(data);
    return ( 
        <div>
            
            <div>
                <div>
                    <ul>
                        {data.map(user =>(
                            <li key={user.id}>{user.name}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    list of orders by user
                </div>
            </div>
        </div>
     );
}
 
export default CustomersDashboard;