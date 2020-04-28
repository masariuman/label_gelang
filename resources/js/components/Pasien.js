import React, { Component } from "react";

class Pasien extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pagination: [],
            cari: "",
            url: "/pasien/data",
            awalan: "TN.",
            tanggal_masuk: "",
            peminjam: "%10"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderCari = this.renderCari.bind(this);
        this.getData = this.getData.bind(this);
        this.awalanChange = this.awalanChange.bind(this);
        this.tanggalmasukChange = this.tanggalmasukChange.bind(this);
        this.peminjamChange = this.peminjamChange.bind(this);
    }

    getTodayDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = "0" + dd;
        }
        if (mm < 10) {
            mm = "0" + mm;
        }
        var terbalik = yyyy + "-" + mm + "-" + dd;
        return terbalik;
    }

    tanggalmasukChange(e) {
        this.setState({
            tanggal_masuk: e.target.value
        });
    }

    awalanChange(e) {
        this.setState({
            awalan: e.target.value
        });
    }

    handleChange(e) {
        this.setState({
            cari: e.target.value
        });
        // console.log(e.target.value);
    }

    peminjamChange(e) {
        this.setState({
            peminjam: e.target.value
        });
        // console.log(e.target.value);
    }

    handleSubmit(e) {
        e.preventDefault();
        axios
            .post("/tracer/data", {
                cari: this.state.cari
            })
            .then(response => {
                this.setState({
                    data: [response.data.cari],
                    cari: "",
                    tanggal_masuk: this.getTodayDate(),
                    peminjam: "%10"
                });
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    getData() {
        axios.get("/pasien/data").then(response => {
            this.setState({
                data: response.data.cari.pasien,
                tanggal_masuk: this.getTodayDate(),
                peminjam: "%10"
            });
            // console.log(response.data.cari.pasien);
        });
    }

    renderCari() {
        if (!this.state.data) {
            return this.state.data.map(data => (
                <div key="1">DATA TIDAK ADA</div>
            ));
        } else {
            return this.state.data.map(data => (
                <tr key={data[0].nomor}>
                    <td>{data[0].nomor}</td>
                    <td className="widthnorm">{data[0].NORMTITIK}</td>
                    <td>{data[0].NAMA}</td>
                    <td className="widthjk">
                        {data[0].JENIS_KELAMIN === 1
                            ? "Laki-Laki"
                            : "Perempuan"}
                    </td>
                    <td className="widthlahir">{data[0].TANGGAL_LAHIR}</td>
                </tr>
            ));
        }
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate() {}

    render() {
        console.log(this.state.data);
        return (
            <div>
                <div className="app-page-title">
                    <div className="page-title-wrapper">
                        <div className="page-title-heading">
                            <div className="page-title-icon">
                                <i className="pe-7s-search icon-gradient bg-happy-green"></i>
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
                                        Tujuan :
                                    </span>
                                    <select className="form-control parents">
                                        <option value="UGD">UGD</option>
                                        <option value="UGD">Poli Mata</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                        <p></p>
                        <hr />
                        <p></p>
                        <div className="table-responsive">
                            <table className="mb-0 table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Nomor</th>
                                        <th>Rekam Medis</th>
                                        <th>Nama Pasien</th>
                                        <th>JK</th>
                                        <th>Tanggal Lahir</th>
                                    </tr>
                                </thead>
                                <tbody>{this.renderCari()}</tbody>
                            </table>
                            {this.state.pagination.next_page_url ? (
                                <button
                                    className="btn-wide mb-2 mr-2 btn-icon btn-icon-right btn-shadow btn-pill btn btn-outline-success"
                                    onClick={this.loadMore}
                                >
                                    More
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Pasien;
