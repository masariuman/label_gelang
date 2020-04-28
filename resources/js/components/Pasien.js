import React, { Component } from "react";

class Pasien extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pagination: [],
            cari: "",
            url: "/tracer/data",
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
        axios.get("/tracer/data").then(response => {
            this.setState({
                data: response.data.cari.pasien,
                tanggal_masuk: this.getTodayDate(),
                peminjam: "%10"
            });
            // console.log(response.data.cari);
        });
    }

    renderCari() {
        if (!this.state.data[0]) {
            return this.state.data.map(data => (
                <div key="1">DATA TIDAK ADA</div>
            ));
        } else {
            return this.state.data.map(data => (
                <tr key={data.NORM}>
                    <td className="widthnorm">{data.NORMTITIK}</td>
                    <td className="widthtglmasuk">
                        <input
                            name="TANGGAL_MASUK"
                            placeholder="Tanggal Masuk"
                            type="date"
                            className="form-control widthtglmasuk"
                            required
                            onChange={this.tanggalmasukChange}
                            value={this.state.tanggal_masuk}
                        />
                    </td>
                    <td className="widthawalan">
                        <select
                            name="AWALAN"
                            id="exampleSelect"
                            className="form-control widthawalan"
                            onChange={this.awalanChange}
                        >
                            <option value="TN.">TN.</option>
                            <option value="NY.">NY.</option>
                            <option value="NN.">NN.</option>
                            <option value="AN.">AN.</option>
                            <option value="BY.">BY.</option>
                            <option value="BY.NY">BY.NY</option>
                        </select>
                    </td>
                    <td>{data.NAMA}</td>
                    <td className="widthjk">
                        {data.JENIS_KELAMIN === 1 ? "L" : "L"}
                    </td>
                    <td>{data.poli}</td>
                    {/* <td>{data.TEMPAT_LAHIR}</td> */}
                    <td className="widthlahir">{data.TANGGAL_LAHIR}</td>
                    {/* <td>{data.ALAMAT}</td> */}
                    <td className="widthpeminjam">
                        <input
                            name="PEMINJAM"
                            placeholder="Peminjam"
                            type="text"
                            className="form-control widthpeminjam"
                            required
                            onChange={this.peminjamChange}
                            value={this.state.peminjamChange}
                        />
                    </td>
                    <td className="widthcetak">
                        <a
                            onSubmit={this.handleSubmit}
                            // href={`/tracer/${data.NORM}/print`}
                            href={`/${data.NORM}/${this.state.awalan}/${this.state.tanggal_masuk}/${this.state.peminjam}/tracer`}
                            className="btn btn-alternate btn-xs"
                            target="_blank"
                        >
                            <i className="fa fa-print"></i> Print
                        </a>
                    </td>
                </tr>
            ));
        }
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate() {}

    render() {
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
                                <input
                                    onChange={this.handleChange}
                                    value={this.state.cari}
                                    className="form-control-lg form-control"
                                    placeholder="Cari Nomor Rekam Medis"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn-square btn-hover-shine btn btn-success"
                            >
                                <a className="pe-7s-search"></a> CARI / KLIK
                                ENTER UNTUK CARI
                            </button>
                        </form>
                        <p></p>
                        <button
                            type="button"
                            className="btn-square btn-hover-shine btn btn-primary"
                            onClick={this.getData}
                        >
                            {" "}
                            &nbsp;
                            <a className="pe-7s-note2"></a> TAMPILKAN PASIEN
                            HARI INI &nbsp; &nbsp;
                        </button>
                        <hr />
                        <p></p>
                        <div className="table-responsive">
                            <table className="mb-0 table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Rekam Medis</th>
                                        <th>Tanggal Masuk</th>
                                        <th>Awalan</th>
                                        <th>Nama Pasien</th>
                                        <th>JK</th>
                                        <th>Tujuan Poli</th>
                                        {/* <th>Tempat Lahir</th> */}
                                        <th>Tanggal Lahir</th>
                                        {/* <th>Alamat</th> */}
                                        <th>Peminjam</th>
                                        <th>Cetak Tracer</th>
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
