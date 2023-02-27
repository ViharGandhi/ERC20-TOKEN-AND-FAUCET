pragma solidity 0.8.17;



interface IERC20{
      function transfer(address to, uint256 amount) external returns (bool);

    function balanceOf(address account) external view returns (uint256);
    
    event Transfer(address indexed from, address indexed to, uint256 value);
}
contract Faucet{
    IERC20 public token;
    address payable owner;
    uint256 public withdrawamount = 5 * (10**18);
    uint256 public reqtime = 1 minutes;
    
    event Withdrawal(address indexed to, uint256 indexed amount);
    event Deposit(address indexed from, uint256 indexed amount);
    mapping(address => uint256) public reqtimemap;
    constructor(address tokenaddress){
        token = IERC20(tokenaddress);
        owner = payable(msg.sender);
    }
    function requesttoken() public{
        require(msg.sender != address(0),"Cant transfer to a zero address");
        require((token.balanceOf(address(this)) > withdrawamount),"Not enough tokens");
        require(block.timestamp>=reqtimemap[msg.sender],"please request aftet sometime");
        reqtimemap[msg.sender]=block.timestamp + reqtime;
        token.transfer(msg.sender, withdrawamount);
    }
     receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the contract owner can call this function"
        );
        _;
    }
    function getbalance()external view returns(uint256){
        return token.balanceOf(address(this));
    }
    function setwithdrawamount(uint256 amount) external{
        withdrawamount = amount * (10**18);
    }
    function setreqtime(uint _time)external{
        reqtime  = _time  * 1 minutes;
    }
    function withdrawtokens() external onlyOwner {
        emit Withdrawal(msg.sender, token.balanceOf(address(this)));
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }
}