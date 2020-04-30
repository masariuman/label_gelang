import React, { Component } from "react";

class Pasien extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            url: "/pasien/data",
            tujuan: "101010101"
        };
        this.handleChange = this.handleChange.bind(this);
        this.renderCari = this.renderCari.bind(this);
        this.getData = this.getData.bind(this);
    }

    handleChange(e) {
        this.setState({
            tujuan: e.target.value
        });
        // console.log(e.target.value);
        if (e.target.value == "101020101") {
            axios.get(`/pasien/data/ugd/${e.target.value}`).then(response => {
                this.setState({
                    data: response.data.cari
                });
                // console.log(response.data.cari.pasien);
            });
        } else {
            axios.get(`/pasien/data/${e.target.value}`).then(response => {
                this.setState({
                    data: response.data.cari
                });
                // console.log(response.data.cari.pasien);
            });
        }
    }

    getData() {
        axios.get(`/pasien/data/${this.state.tujuan}`).then(response => {
            this.setState({
                data: response.data.cari
            });
            // console.log(response.data.cari.pasien);
        });
    }

    renderCari() {
        if (this.state.tujuan === "101020101") {
            return (
                <table className="mb-0 table table-bordered">
                    <thead>
                        <tr>
                            <th>No Urut</th>
                            <th>Rekam Medis</th>
                            <th>Nama Pasien</th>
                            <th>JK</th>
                            <th>Tanggal Lahir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(data => (
                            <tr key={data[0].nomor}>
                                <td className="widthnodaftar">{data[0].nomor}</td>
                                <td className="widthnorm">
                                    {data[0].NORMTITIK}
                                </td>
                                <td>{data[0].NAMA}</td>
                                <td className="widthjk">
                                    {data[0].JENIS_KELAMIN === 1
                                        ? "L"
                                        : "P"}
                                </td>
                                <td className="widthlahir">
                                    {data[0].TANGGAL_LAHIR}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            return this.state.data.map((post, i) => (
                <div key={`Key${i}`} className="margintop30">
                    <table className="mb-0 table table-bordered">
                        <thead>
                            <tr>
                            <th colSpan="5" className="bg-happy-green"><center><h5><b class="text-light">{post[0].nama_dokter}</b></h5></center></th>
                            </tr>
                            <tr>
                                <th>No Urut</th>
                                <th>Rekam Medis</th>
                                <th>Nama Pasien</th>
                                <th>JK</th>
                                <th>Tanggal Lahir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {post.map((detail, j) => (
                                <tr key={`Key${j}`}>
                                    <td className="widthnodaftar">{detail.nomor}</td>
                                    <td className="widthnorm">{detail.NORM}</td>
                                    <td>{detail.NAMA}</td>
                                    <td className="widthjk">
                                        {detail.JENIS_KELAMIN === 1
                                            ? "L"
                                            : detail.JENIS_KELAMIN === 2
                                            ? "P"
                                            : ""}
                                    </td>
                                    <td className="widthlahir">{detail.TANGGAL_LAHIR}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ));
        }
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate() {}

    render() {
        // console.log(this.state.data);
        return (
            <div>
                <div className="app-page-title">
                    <div className="page-title-wrapper">
                        <div className="page-title-heading">
                            <div className="page-title-icon">
                                <i className="pe-7s-note2 icon-gradient bg-happy-green"></i>
                            </div>
                            <div>
                                PASIEN HARI INI
                                <div className="page-title-subheading">
                                    Halaman ini berfungsi untuk melihat Pasien
                                    Hari Ini.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-card mb-3 card">
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <div>
                                    <span className="parents-line">
                                        <h5><b>Tujuan :</b></h5>
                                    </span>
                                    <p></p>
                                    <select
                                        className="form-control parents"
                                        onChange={this.handleChange}
                                        value={this.state.tujuan}
                                    >
                                        <option value="101010101">
                                            Poli Anak
                                        </option>
                                        <option value="101010102">
                                            Poli Bedah
                                        </option>
                                        {/* <option value="101010103">
                                            Poli Gigi Anak
                                        </option> */}
                                        <option value="101010104">
                                            Poli Gigi Umum
                                        </option>
                                        <option value="101010105">
                                            Poli Mata
                                        </option>
                                        <option value="101010106">
                                            Poli Neurologi/Syaraf
                                        </option>
                                        <option value="101010107">
                                            Poli Obgyn/Kandungan
                                        </option>
                                        <option value="101010108">
                                            Poli Penyakit Dalam
                                        </option>
                                        <option value="101010109">
                                            Poli THT
                                        </option>
                                        <option value="101010110">
                                            Poli Bedah Syaraf
                                        </option>
                                        <option value="101010111">
                                            Poli Forensik
                                        </option>
                                        <option value="101020101">UGD</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                        <p></p>
                        <hr />
                        <p></p>
                        <div className="table-responsive">
                            {this.renderCari()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Pasien;
