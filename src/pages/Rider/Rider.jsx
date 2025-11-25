import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import rider from '../../assets/agent-pending.png';

const Rider = () => {
  const { register, handleSubmit, control } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    return regionDistricts.map((d) => d.district);
  };

  const riderRegion = useWatch({ control, name: "region" });

  const handleRiderApplication = (data) => {
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your application has been submitted.",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div className="w-full px-6 py-10 bg-gray-50 rounded-xl shadow-sm">
    
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        <div>
          <h2 className="text-4xl font-bold text-primary mb-3">Be a Rider</h2>
          <p className="text-gray-600 mb-10 max-w-lg">
            Enjoy fast, reliable parcel delivery with real‑time tracking and zero hassle.
            From personal packages to business shipments — we deliver on time, every time.
          </p>

          <form onSubmit={handleSubmit(handleRiderApplication)} className="space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* LEFT */}
              <div className="bg-white p-6 rounded-xl shadow-md border">
                <h4 className="text-xl font-semibold mb-4">Rider Details</h4>

                <label className="text-sm font-medium">Rider Name</label>
                <input type="text" {...register("name")} defaultValue={user?.displayName}
                  className="input w-full bg-gray-100 border rounded-lg p-2 mb-3" />

                <label className="text-sm font-medium">Email</label>
                <input type="text" {...register("email")} defaultValue={user?.email}
                  className="input w-full bg-gray-100 border rounded-lg p-2 mb-3" />

                <label className="text-sm font-medium">Region</label>
                <select {...register("region")} defaultValue="Pick a region"
                  className="select w-full bg-gray-100 border rounded-lg p-2 mb-3">
                  <option disabled>Pick a region</option>
                  {regions.map((r, i) => <option key={i}>{r}</option>)}
                </select>

                <label className="text-sm font-medium">District</label>
                <select {...register("district")} defaultValue="Pick a district"
                  className="select w-full bg-gray-100 border rounded-lg p-2">
                  <option disabled>Pick a district</option>
                  {districtsByRegion(riderRegion)?.map((d, i) => <option key={i}>{d}</option>)}
                </select>

                <label className="text-sm font-medium mt-4 block">Your Address</label>
                <input type="text" {...register("address")} className="input w-full bg-gray-100 border rounded-lg p-2" />
              </div>

              {/* RIGHT */}
              <div className="bg-white p-6 rounded-xl shadow-md border">
                <h4 className="text-xl font-semibold mb-4">More Details</h4>

                <label className="text-sm font-medium">Driving License</label>
                <input type="text" {...register("license")} className="input w-full bg-gray-100 border rounded-lg p-2 mb-3" />

                <label className="text-sm font-medium">NID</label>
                <input type="text" {...register("nid")} className="input w-full bg-gray-100 border rounded-lg p-2 mb-3" />

                <label className="text-sm font-medium">Bike</label>
                <input type="text" {...register("bike")} className="input w-full bg-gray-100 border rounded-lg p-2" />
              </div>
            </div>

            <button type="submit" className="w-full bg-lime-400 hover:bg-lime-500 text-black font-semibold py-3 rounded-lg transition">
              Apply as a Rider
            </button>
          </form>
        </div>

        {/* IMAGE */}
        <div className="flex justify-center items-start">
          <img src={rider} alt="rider" className="w-3/4 drop-shadow-xl" />
        </div>

      </div>
    </div>
  );
};

export default Rider;
