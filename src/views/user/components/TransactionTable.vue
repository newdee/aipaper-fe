<template>
  <el-table :data="list" style="width: 100%; padding-top: 15px">
    <el-table-column label="Order_No" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.order_no | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="Price" width="195" align="center">
      <template slot-scope="scope">
        ¥{{ scope.row.price | toThousandFilter }}
      </template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template slot-scope="{ row }">
        <el-tag :type="row.status | statusFilter">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: "success",
        pending: "danger",
      };
      return statusMap[status];
    },
    orderNoFilter(str) {
      return str.substring(0, 30);
    },
  },
  data() {
    return {
      list: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      let dataList = [
        {
          order_no: "4DFbDeD6-F44D-Acfe-8b10-d6ae7C8D92e6",
          timestamp: 952946735070,
          username: "Dorothy Hall",
          price: 9049.86,
          status: "success",
        },
        {
          order_no: "1a42D88A-3d14-c6bb-56EE-DCCD3dE0BE19",
          timestamp: 952946735070,
          username: "Sarah Clark",
          price: 1662,
          status: "pending",
        },
        {
          order_no: "F98ec1dC-aB66-5e91-f4c1-E1Bf4eb132Ff",
          timestamp: 952946735070,
          username: "Susan Lopez",
          price: 7224,
          status: "pending",
        },
        {
          order_no: "CAE4b883-f1c4-ABc1-D865-DDb8ac844CfC",
          timestamp: 952946735070,
          username: "Jeffrey Johnson",
          price: 7190,
          status: "pending",
        },
        {
          order_no: "ddFa509E-c4fe-1E3A-4173-b34fCF2A5Ce3",
          timestamp: 952946735070,
          username: "Brian Johnson",
          price: 8083.4,
          status: "success",
        },
        {
          order_no: "FDAf93Ca-2c82-e508-b2Af-47e4eFAC409B",
          timestamp: 952946735070,
          username: "Patricia Lewis",
          price: 11729.41,
          status: "pending",
        },
        {
          order_no: "5FcDC1CB-CbfF-fE32-8BBb-9D27aaeeCeEc",
          timestamp: 952946735070,
          username: "Susan Thompson",
          price: 1466.2,
          status: "success",
        },
        {
          order_no: "2FcA9b88-7dd8-FFCc-DF32-9436F51CDDF9",
          timestamp: 952946735070,
          username: "Daniel Smith",
          price: 7424.6,
          status: "pending",
        },
        {
          order_no: "32B6031e-CDeE-C2be-2e3A-f8Ec2ad77AcA",
          timestamp: 952946735070,
          username: "Brenda Wilson",
          price: 2220,
          status: "pending",
        },
        {
          order_no: "16196aF2-C6De-E35C-629f-f9Afbe4b7cD9",
          timestamp: 952946735070,
          username: "Melissa Jackson",
          price: 13720.6,
          status: "success",
        },
        {
          order_no: "aCD5F9BD-cBE7-dD14-1cDa-b84fCF197a80",
          timestamp: 952946735070,
          username: "Daniel Clark",
          price: 3799,
          status: "pending",
        },
        {
          order_no: "E1aFE33B-A5e9-51F6-e4e1-fAEb4b717D5a",
          timestamp: 952946735070,
          username: "Thomas Williams",
          price: 6078.05,
          status: "success",
        },
        {
          order_no: "b4731B6F-76b2-d6b3-BE6f-A5Ded1BFC31e",
          timestamp: 952946735070,
          username: "Ronald Miller",
          price: 11381,
          status: "pending",
        },
        {
          order_no: "F9Ca2Bd4-71DD-ec8e-1284-a67b71f73aAc",
          timestamp: 952946735070,
          username: "Shirley Garcia",
          price: 12905.2,
          status: "pending",
        },
        {
          order_no: "ccA1cCdb-2C96-96ea-eeDB-d4723BAc74fE",
          timestamp: 952946735070,
          username: "Gary Thomas",
          price: 5245.1,
          status: "success",
        },
        {
          order_no: "8ddB38D7-53F1-E7E5-C65F-9DFde33Bbf0A",
          timestamp: 952946735070,
          username: "Timothy Johnson",
          price: 13700.7,
          status: "pending",
        },
        {
          order_no: "AF8Dd5C5-ABde-c4FF-B4d4-03Fb8A6D2c4f",
          timestamp: 952946735070,
          username: "Elizabeth Taylor",
          price: 9373,
          status: "success",
        },
        {
          order_no: "BABAEe3C-fD7A-778C-C26d-C33Bb3Df83f8",
          timestamp: 952946735070,
          username: "Sharon Jones",
          price: 13339.3,
          status: "success",
        },
        {
          order_no: "4cafEdD1-4167-3c5F-0eC3-cFbbc13Bc00f",
          timestamp: 952946735070,
          username: "Sarah Robinson",
          price: 11544.28,
          status: "pending",
        },
        {
          order_no: "8c8005D1-dd9f-eBBF-3db9-0b6DC5f00b18",
          timestamp: 952946735070,
          username: "Cynthia Garcia",
          price: 3926.5,
          status: "success",
        },
      ];
      // transactionList().then(response => {
      //   this.list = response.data.items.slice(0, 8)
      // })
      this.list = dataList.slice(0, 8);
    },
  },
};
</script>
