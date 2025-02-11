import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { fetchDogIds, fetchDogs, fetchMatch, fetchBreeds, logoutUser } from "../Api";
import '../Pages/Browse/Browse.css';

const BrowseDogs = () => {
    // State variables for managing dog data
    const [dogs, setDogs] = useState([]);
    const [selectedDogs, setSelectedDogs] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [selectedBreed, setSelectedBreed] = useState(null);

    // Pagination state
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    // Sorting state
    const [sortField, setSortField] = useState("breed");
    const [sortOrder, setSortOrder] = useState("asc");

    // Dialog state for matched dog
    const [matchedDog, setMatchedDog] = useState(null);
    const [showDialog, setShowDialog] = useState(false);

    const navigate = useNavigate(); // Hook for navigation

    // Fetch dog data based on selected breed, pagination, and sorting
    useEffect(() => {
        const getDogs = async () => {
            try {
                const breedFilter = selectedBreed ? [selectedBreed] : [];
                const { resultIds, total } = await fetchDogIds(pageSize, page * pageSize, sortField, sortOrder, breedFilter);
                if (!resultIds || resultIds.length === 0) return;

                const dogData = await fetchDogs(resultIds);
                setDogs(dogData);
                setTotalRecords(total);
            } catch (error) {
                console.error("Error fetching dogs:", error);
            }
        };
        getDogs();
    }, [selectedBreed, page, pageSize, sortField, sortOrder]);

    // Fetch available dog breeds
    useEffect(() => {
        const getBreeds = async () => {
            try {
                const breedData = await fetchBreeds();
                if (Array.isArray(breedData)) {
                    setBreeds(breedData.map((breed) => ({ label: breed, value: breed })));
                }
            } catch (error) {
                console.error("Error fetching breeds:", error);
            }
        };
        getBreeds();
    }, []);

    // Handle pagination changes
    const handlePageChange = (event) => {
        setPage(event.page);
        setPageSize(event.rows);
    };

    // Handle sorting changes
    const handleSort = (event) => {
        setSortField(event.sortField);
        setSortOrder(event.sortOrder === 1 ? "asc" : "desc");
    };

    // Toggle sorting order
    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    };

    // Find and display a matched dog based on selected dogs
    const handleFindMatch = async () => {
        if (selectedDogs.length === 0) {
            alert("Please select at least one dog to find a match.");
            return;
        }
        try {
            const selectedDogIds = selectedDogs.map((dog) => dog.id);
            const matchedDogId = await fetchMatch(selectedDogIds);
            if (matchedDogId.match) {
                const matchedDogData = await fetchDogs([matchedDogId.match]);
                if (matchedDogData.length > 0) {
                    setMatchedDog(matchedDogData[0]);
                    setShowDialog(true);
                }
            } else {
                alert("No match found. Try selecting different dogs.");
            }
        } catch (error) {
            console.error("Error fetching matched dog details:", error);
        }
    };

    // Logout function
    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate("/");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    // Custom header for the DataTable
    const renderHeader = () => (
        <div className="table-header">
            <h2>Dogs</h2>
            <Dropdown value={selectedBreed} options={breeds} onChange={(e) => setSelectedBreed(e.value)}
                placeholder="Select Breed" style={{ minWidth: "12rem" }} showClear />
            <Button label="Sort Breeds" icon={sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />} onClick={toggleSortOrder} />
            <Button label="Find My Match" className="p-button-success" onClick={handleFindMatch} />
            <Button label="Log Out" className="p-button-danger" onClick={handleLogout} />
        </div>
    );

    return (
        <>
            <DataTable
                value={dogs}
                paginator
                rows={pageSize}
                totalRecords={totalRecords}
                first={page * pageSize}
                lazy
                onPage={handlePageChange}
                onSort={handleSort}
                sortField={sortField}
                sortOrder={sortOrder === "asc" ? 1 : -1}
                selectionMode="multiple"
                selection={selectedDogs}
                onSelectionChange={(e) => setSelectedDogs(e.value)}
                paginatorTemplate="PrevPageLink PageLinks NextPageLink"
                metaKeySelection={false}
                header={renderHeader()}
            >
                <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
                <Column field="name" header="Name" />
                <Column field="breed" header="Breed" />
                <Column field="age" header="Age" />
                <Column body={(dog) => <Image src={dog.img} alt={dog.name} width="50" preview />} header="Image" />
                <Column field="zip_code" header="Zip Code" />
            </DataTable>

            {/* Dialog for displaying the matched dog */}
            <Dialog
                visible={showDialog}
                onHide={() => setShowDialog(false)}
                header="Your Matched Dog"
                modal
                style={{ width: "400px" }}
            >
                {matchedDog && (
                    <div style={{ textAlign: "center" }}>
                        <Image src={matchedDog.img} alt={matchedDog.name} width="200" preview />
                        <h3>{matchedDog.name}</h3>
                        <p><strong>Breed:</strong> {matchedDog.breed}</p>
                        <p><strong>Age:</strong> {matchedDog.age}</p>
                        <p><strong>Zip Code:</strong> {matchedDog.zip_code}</p>
                    </div>
                )}
            </Dialog>
        </>
    );
};

export default BrowseDogs;
